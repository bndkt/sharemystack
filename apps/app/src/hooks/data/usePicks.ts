import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Tool } from "@/model/Tool";
import { Q } from "@nozbe/watermelondb";
import { Pick } from "@/model/Pick";

export function usePicks() {
  const database = useDatabase();
  const [picks, setPicks] = useState<Pick[]>();

  const picksQuery = database.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.sortBy("updated_at"));

  useEffect(() => {
    const subscription = picksQuery.observe().subscribe((data) => {
      setPicks(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { picks };
}
