import { ReactNode, createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { debounce } from "tamagui";

import { Loading } from "@/components/Loading";
import { sync } from "@/lib/sync";
import { database } from "@/lib/watermelon";

export const SyncContext = createContext<{
  isSyncing: boolean;
  queueSync: ({
    reset,
    broadcast = true,
  }: {
    reset?: boolean;
    broadcast?: boolean;
  }) => void;
  shouldBroadcast?: boolean;
  handleBroadcastSent: () => void;
}>({
  isSyncing: false,
  queueSync: () => {},
  handleBroadcastSent: () => {},
});

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isResetting, setIsResetting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncQueued, setIsSyncQueued] = useState(false);
  const [shouldBroadcast, setShouldBroadcast] = useState(false);

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

            if (changedRecords?.length && !isSyncing) {
              const debouncedSync = debounce(() => sync(), 1000); // TODO: Use queueSync instead?
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
    reset,
    broadcast = true,
  }: { reset?: boolean; broadcast?: boolean } = {}) {
    if (!isSyncing ?? reset) {
      console.log("♻️ Starting sync");
      setIsSyncing(true);
      setIsResetting(reset ?? false);
      sync({ reset })
        .then(() => {
          console.log("♻️ Sync succeeded");
          setIsResetting(false);
          setShouldBroadcast(broadcast);
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

  return isResetting ? (
    <Loading message="Syncing" />
  ) : (
    <SyncContext.Provider
      value={{
        isSyncing,
        queueSync,
        shouldBroadcast,
        handleBroadcastSent: () => setShouldBroadcast(false),
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
