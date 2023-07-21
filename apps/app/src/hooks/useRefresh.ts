import { useState } from "react";

import { sync } from "@/lib/sync";

export function useRefresh() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueued, setRefreshQueued] = useState(false);

  function refresh(reset?: boolean) {
    if (!refreshing) {
      setRefreshing(true);
      sync(reset).finally(() => {
        setRefreshing(false);
        refreshQueued && refresh();
      });
    } else {
      setRefreshQueued(true);
    }
  }

  return { refreshing, refresh };
}
