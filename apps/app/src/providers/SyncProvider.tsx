import { RealtimeChannel } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { YStack, debounce } from "tamagui";

import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";
import { database } from "@/lib/watermelon";

export const SyncContext = createContext<{
  isSyncing: boolean;
  queueSync: ({
    reset,
    broadcast = true,
  }?: {
    reset?: boolean;
    broadcast?: boolean;
  }) => void;
  reset: () => void;
}>({
  isSyncing: false,
  queueSync: () => {},
  reset: () => {},
});

const syncDelay = 0;

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isResetting, setIsResetting] = useState(false);
  const [isReadyToReset, setIsReadyToReset] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncQueued, setIsSyncQueued] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel>();
  const { user } = useAuth();

  // Subscribe to broadcasts
  useEffect(() => {
    if (user) {
      const channel = supabase.channel(`sync-${user.id}`);
      const subscription = channel
        .on("broadcast", { event: "sync" }, (payload) => {
          console.log("Broadcast received", payload);
          queueSync({ broadcast: false });
        })
        .subscribe();

      console.log("Subscribed to broadcast", `sync-${user.id}`);

      setChannel(channel);

      return () => {
        subscription.unsubscribe();
        console.log("Unsubscribed from broadcast");
      };
    }
  }, [user]);

  function sendBroadcast(payload: { [key: string]: any; type: string }) {
    if (channel) {
      console.log("♻️ Sending broadcast");
      channel.send(payload).then((response) => {
        console.log("♻️ Broadcast sent", response);
      });
    }
  }

  useEffect(() => {
    queueSync();

    const subscription = AppState.addEventListener("change", () => {
      queueSync();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!isResetting) {
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

            if (changedRecords?.length) {
              const debouncedSync = debounce(() => queueSync(), syncDelay); // TODO: Use queueSync instead?
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
  }, [database, isResetting]);

  function queueSync({
    reset = false,
    broadcast = true,
  }: { reset?: boolean; broadcast?: boolean } = {}) {
    if (!isSyncing ?? reset) {
      console.log("♻️ Starting sync");
      setIsSyncing(true);
      setIsResetting(reset);
      sync({ reset })
        .then(() => {
          console.log("♻️ Sync succeeded");
          setIsResetting(false);
          // setShouldBroadcast(broadcast);
          sendBroadcast({
            type: "broadcast",
            event: "sync",
          });
          setIsSyncing(false);
        })
        .catch((reason) => {
          console.log("♻️ Sync failed", reason);
          setIsSyncing(false);
        });
    } else {
      console.log("♻️ Already syncing, queueing sync");
      setIsSyncQueued(true);
    }
  }

  // If not syncing but sync is queued, start sync
  useEffect(() => {
    if (isSyncing && isSyncQueued) {
      setIsSyncQueued(false);
      queueSync();
    }
  }, [isSyncing, isSyncQueued]);

  // To reset, set isResetting to true, which will unmount all screens and set isReadyToReset to true via onLayout
  function reset() {
    setIsResetting(true);
  }

  useEffect(() => {
    if (isReadyToReset) {
      console.log("sending queueSync({ reset: true });");
      queueSync({ reset: true });
      setIsReadyToReset(false);
    }
  }, [isReadyToReset]);

  return isResetting ? (
    <YStack
      fullscreen
      onLayout={() => {
        setIsReadyToReset(true);
      }}
    >
      <Loading message="Syncing" />
    </YStack>
  ) : (
    <SyncContext.Provider
      value={{
        isSyncing,
        queueSync,
        reset,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
