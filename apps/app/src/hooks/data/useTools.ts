import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Tool } from "@/model/Tool";
import { Q } from "@nozbe/watermelondb";

export function useTools() {
  const database = useDatabase();
  const [tools, setTools] = useState<Tool[]>();

  const categoriesQuery = database.collections
    .get<Tool>(TableName.TOOLS)
    .query(Q.sortBy("name"));

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setTools(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { tools };
}
