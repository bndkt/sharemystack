import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useObservableTool({
  slug,
  loadPicks,
}: {
  slug?: string;
  loadPicks?: boolean;
}) {
  const database = useDatabase();
  const [tool, setTool] = useState<Tool>();
  const [picks, setPicks] = useState<Pick[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const toolsCollection = database.collections.get<Tool>(TableName.TOOLS);

      const toolsQuery = toolsCollection.query(
        Q.where("slug", Q.like(slug)),
        Q.take(1)
      );
      const toolsObservable = toolsQuery.observe();

      const subscription = toolsObservable.subscribe((newTools) => {
        setTool(newTools[0]);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, [database, slug]);

  useEffect(() => {
    if (tool && loadPicks) {
      const subscription = tool.picks
        .extend(Q.sortBy("updated_at", "desc"))
        .observe()
        .subscribe((newPicks) => {
          setPicks(newPicks);
        });

      return () => subscription.unsubscribe();
    }
  }, [tool, loadPicks]);

  return { tool, picks, loading };
}
