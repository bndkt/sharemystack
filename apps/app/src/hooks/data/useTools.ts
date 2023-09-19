import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useTools({
  recentlyAdded,
  limit,
}: { recentlyAdded?: boolean; limit?: number } = {}) {
  const database = useDatabase();
  const [tools, setTools] = useState<Tool[]>();

  let categoriesQuery = database.collections
    .get<Tool>(TableName.TOOLS)
    .query(recentlyAdded ? Q.sortBy("created_at", "desc") : Q.sortBy("name"));

  if (recentlyAdded) {
    categoriesQuery = categoriesQuery.extend(
      Q.where("tool_icon_id", Q.notEq(null)),
    );
  }

  if (limit) {
    categoriesQuery = categoriesQuery.extend(Q.take(limit));
  }

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setTools(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { tools };
}
