import { RealtimeChannel } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { YStack, debounce } from "tamagui";

import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";
import { database } from "@/lib/watermelon";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
          queueSync();
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

  // Send broadcast
  function sendBroadcast(payload: { [key: string]: any; type: string }) {
    if (channel) {
      console.log("♻️ Sending broadcast");
      channel.send(payload).then((response) => {
        console.log("♻️ Broadcast sent", response);
      });
    }
  }

  // On initial load, queue sync and liste for app state changes
  useEffect(() => {
    console.log("Initial sync");
    queueSync();

    const subscription = AppState.addEventListener("change", () => {
      queueSync();
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Listen for db events as along as we're not resetting
  useEffect(() => {
    if (!isResetting) {
      const subscription = database
        .withChangesForTables(["stacks", "picks", "stars", "profiles"])
        .subscribe({
          next: (changes) => {
            const changedRecords = changes?.filter(
              (c) => c.record.syncStatus !== "synced",
            );

            if (changes?.length ?? changedRecords?.length) {
              console.log(
                "♻️ Database changes",
                changes?.length,
                changedRecords?.length,
              );
            }

            if (changedRecords?.length) {
              const debouncedSync = debounce(() => queueSync(), syncDelay);
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

  function queueSync() {
    setIsSyncQueued(true);
    console.log("queueSync", { isSyncing, isSyncQueued });
  }

  /* useEffect(() => {
    if (!isSyncing && isSyncQueued) {
      sync()
        .then(() => {
          console.log("♻️ Sync succeeded");
          sendBroadcast({
            type: "broadcast",
            event: "sync",
          });
        })
        .catch((reason) => {
          console.log("♻️ Sync failed", reason);
        })
        .finally(() => {
          setIsSyncing(false);
        });
    }
  }, [isSyncing, isSyncQueued]); */

  // If not syncing but sync is queued, execute sync
  useEffect(() => {
    if (!isSyncing && isSyncQueued) {
      executeSync();
    }
  }, [isSyncing, isSyncQueued]);

  // To reset, set isResetting to true, which will unmount all screens and set isReadyToReset to true via onLayout
  function reset() {
    setIsResetting(true);
  }

  // If ready to reset and not syncing, execute sync
  useEffect(() => {
    if (isReadyToReset && !isSyncing) {
      console.log("Ready to reset");
      executeSync(true);
    }
  }, [isReadyToReset, isSyncing]);

  async function executeSync(reset?: boolean) {
    reset && setIsReadyToReset(false);
    setIsSyncQueued(false);
    setIsSyncing(true);
    // If this is a reset, delay sync call by one second to give the app time to umount all screens
    if (reset) {
      await delay(1000);
    }
    sync({ reset })
      .then(() => {
        console.log("♻️ Sync succeeded", { reset });
        sendBroadcast({
          type: "broadcast",
          event: "sync",
        });
      })
      .catch((reason) => {
        console.log("♻️ Sync failed", { reset, reason });
      })
      .finally(() => {
        setIsSyncing(false);
        reset && setIsResetting(false);
      });
  }

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
