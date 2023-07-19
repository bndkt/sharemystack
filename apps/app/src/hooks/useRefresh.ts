import { useState } from "react";

import { sync } from "@/lib/sync";

export function useRefresh() {
  const [refreshing, setRefreshing] = useState(false);

  function refresh() {
    if (!refreshing) {
      setRefreshing(true);
      sync().then(() => setRefreshing(false));
    }
  }

  return { refreshing, refresh };
}
