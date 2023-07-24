import { useContext } from "react";

import { SyncContext } from "@/providers/SyncProvider";

export function useSync() {
  return useContext(SyncContext);
}
