import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useObservableTools() {
  const database = useDatabase();
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const toolsCollection = database.collections.get<Tool>(TableName.TOOLS);
    const toolsObservable = toolsCollection.query().observe();

    const subscription = toolsObservable.subscribe((newTools) => {
      setTools(newTools);
    });

    // Clean up subscription on component unmount
    return () => subscription.unsubscribe();
  }, [database]);

  return tools;
}
