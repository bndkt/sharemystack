import { ReactNode, createContext, useEffect, useState } from "react";

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
      .subscribe((changes) => {
        sync();
      });

    console.log("♻️ Subscribed to database changes", {
      closed: subscription.closed,
    });

    return () => subscription.unsubscribe();
  }, [database]);

  function sync(reset?: boolean) {
    if (!isSyncing) {
      console.log("♻️ Starting sync");
      setIsSyncing(true);
      watermelonSync(reset).finally(() => {
        console.log("♻️ Sync finished");
        if (isSyncQueued) {
          console.log("♻️ Starting queued sync");
          setIsSyncQueued(false);
          sync();
        } else {
          setIsSyncing(false);
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
