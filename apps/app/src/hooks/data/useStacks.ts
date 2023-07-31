import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Stack } from "@/model/Stack";
import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useStacks({ tool }: { tool: Tool }) {
  const database = useDatabase();
  const [stacks, setStacks] = useState<Stack[]>();

  const categoriesQuery = database.collections
    .get<Stack>(TableName.STACKS)
    .query(Q.sortBy("updated_at"));

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setStacks(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { stacks };
}
