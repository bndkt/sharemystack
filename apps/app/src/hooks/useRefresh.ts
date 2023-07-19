import { useState } from "react";

import { sync } from "@/lib/sync";

export function useRefresh() {
  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    if (!refreshing) {
      setRefreshing(true);
      sync().finally(() => setRefreshing(false));
    }
  }

  return { refreshing, refresh };
}
