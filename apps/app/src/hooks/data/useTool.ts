import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useTool({ slug }: { slug?: string }) {
  const database = useDatabase();
  const [tool, setTool] = useState<Tool | null>();
  const [picks, setPicks] = useState<Pick[] | null>();

  const categoriesQuery = slug
    ? database.collections
        .get<Tool>(TableName.TOOLS)
        .query(Q.where("slug", slug), Q.take(1))
    : undefined;

  useEffect(() => {
    if (categoriesQuery) {
      const subscription = categoriesQuery.observe().subscribe((data) => {
        setTool(data[0] ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      setTool(null);
    }
  }, [database]);

  useEffect(() => {
    if (tool) {
      const subscription = tool.picks
        .extend(Q.sortBy("updated_at", "desc"))
        .observe()
        .subscribe((data) => {
          setPicks(data ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [tool]);

  return { tool, picks };
}
