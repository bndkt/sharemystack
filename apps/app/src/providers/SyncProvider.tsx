import { ReactNode, createContext, useEffect, useState } from "react";
import { debounce } from "tamagui";

import { sync as watermelonSync } from "@/lib/sync";
import { database } from "@/lib/watermelon";

export const SyncContext = createContext<{
  isSyncing: boolean;
  sync: (reset?: boolean) => void;
}>({
  isSyncing: false,
  sync: () => {},
});

export function SyncProvider({ children }: { children: ReactNode }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSyncQueued, setIsSyncQueued] = useState(false);

  useEffect(() => {
    const subscription = database
      .withChangesForTables([
        "tools",
        "categories",
        "categorizations",
        "stacks",
        "picks",
        "stars",
      ])
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
  }, [database]);

  function sync(reset?: boolean) {
    if (!isSyncing) {
      console.log("♻️ Starting sync");
      setIsSyncing(true);
      watermelonSync(reset)
        .then(() => {
          console.log("♻️ Sync succeeded");
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

  return (
    <SyncContext.Provider
      value={{
        isSyncing,
        sync,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}
