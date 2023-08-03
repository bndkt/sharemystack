import { RealtimeChannel } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";
import { debounce } from "tamagui";

import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";
import { database } from "@/lib/watermelon";

export const SyncContext = createContext<{
  isSyncing: boolean;
  initialSync: () => void;
  queueSync: () => void;
}>({
  isSyncing: false,
  initialSync: () => {},
  queueSync: () => {},
});

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isInitiated, setIsInitiated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncQueued, setIsSyncQueued] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel>();
  const [shouldBroadcast, setShouldBroadcast] = useState(false);
  const { user } = useAuth();

  async function initialSync(reset?: boolean) {
    setIsInitiated(false);
    queueSync(reset);
  }

  useEffect(() => {
    queueSync();
  }, []);

  useEffect(() => {
    if (isInitiated) {
      const subscription = database
        .withChangesForTables(["stacks", "picks", "stars", "profiles"])
        .subscribe({
          next: (changes) => {
            const changedRecords = changes?.filter(
              (c) => c.record.syncStatus !== "synced"
            );

            if (changes?.length || changedRecords?.length) {
              console.log(
                "♻️ Database changes",
                changes?.length,
                changedRecords?.length
              );
            }

            if (changedRecords?.length && !isSyncing) {
              const debouncedSync = debounce(() => sync(), 1000);
              debouncedSync();
            }
          },
          error: (error) => console.error("♻️ Database changes error", error),
        });

      console.log("♻️ Subscribed to database changes", {
        closed: subscription.closed,
      });

      return () => {
        subscription.unsubscribe();
        console.log("Unsubscribed from database changes");
      };
    }
  }, [database, isInitiated]);

  useEffect(() => {
    if (user) {
      const channel = supabase.channel(`sync-${user.id}`);
      const subscription = channel
        .on("broadcast", { event: "sync" }, (payload) => {
          console.log("Broadcast received", payload);
          sync();
        })
        .subscribe();

      console.log("Subscribed to broadcast", subscription.state);

      setChannel(channel);

      return () => {
        subscription.unsubscribe();
        console.log("Unsubscribed from broadcast");
      };
    }
  }, [supabase, user]);

  useEffect(() => {
    if (channel && shouldBroadcast) {
      console.log("♻️ Sending broadcast");
      channel
        .send({
          type: "broadcast",
          event: "sync",
          payload: {
            message: "hello, world",
          },
        })
        .then((response) => {
          console.log("♻️ Broadcast sent", response);
        });
      setShouldBroadcast(false);
    }
  }, [channel, shouldBroadcast]);

  function queueSync(reset?: boolean) {
    if (!isSyncing) {
      console.log("♻️ Starting sync");
      setIsSyncing(true);
      sync(reset)
        .then(() => {
          console.log("♻️ Sync succeeded");
          setIsInitiated(true);
          setShouldBroadcast(true);
        })
        .catch((reason) => {
          console.log("♻️ Sync failed", reason);
        })
        .finally(() => {
          setIsSyncing(false);
          if (isSyncQueued) {
            console.log("♻️ Starting queued sync");
            setIsSyncQueued(false);
            // sync();
          }
        });
    } else {
      console.log("♻️ Already syncing, queueing sync");
      setIsSyncQueued(true);
    }
  }

  return isInitiated ? (
    <SyncContext.Provider
      value={{
        isSyncing,
        initialSync,
        queueSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  ) : (
    <Loading message="Syncing" />
  );
}
