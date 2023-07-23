import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";
import { Q } from "@nozbe/watermelondb";

export function useObservableTools() {
  const database = useDatabase();
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const toolsCollection = database.collections.get<Tool>(TableName.TOOLS);
    const toolsObservable = toolsCollection.query(Q.sortBy("name")).observe();

    const subscription = toolsObservable.subscribe((newTools) => {
      setTools(newTools);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return tools;
}
