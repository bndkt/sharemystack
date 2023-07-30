import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useTool({ slug }: { slug: string }) {
  const database = useDatabase();
  const [tool, setTool] = useState<Tool>();

  const categoriesQuery = database.collections
    .get<Tool>(TableName.TOOLS)
    .query(Q.where("slug", slug), Q.take(1));

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setTool(data[0] ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { tool };
}
