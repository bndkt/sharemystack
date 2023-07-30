import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { StackType } from "@/model/StackType";
import { TableName } from "@/model/schema";

export function useStackTypes() {
  const database = useDatabase();
  const [stackTypes, setStackTypes] = useState<StackType[]>();

  const stackTypesQuery = database.collections
    .get<StackType>(TableName.STACK_TYPES)
    .query(Q.sortBy("name"));

  useEffect(() => {
    const subscription = stackTypesQuery.observe().subscribe((data) => {
      setStackTypes(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { stackTypes };
}
