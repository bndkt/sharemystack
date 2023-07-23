import { useState } from "react";

import { sync } from "@/lib/sync";

export function useRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueued, setRefreshQueued] = useState(false);

  function refresh(reset?: boolean) {
    if (!refreshing) {
      console.log("Starting refresh");
      setRefreshing(true);
      sync(reset).finally(() => {
        setRefreshing(false);
        console.log("Refresh finished");
        refreshQueued && refresh();
      });
    } else {
      console.log("Already refreshing, queueing refresh");
      setRefreshQueued(true);
    }
  }

  return { refreshing, refresh };
}
