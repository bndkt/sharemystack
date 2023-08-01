import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { Stack } from "@/model/Stack";
import { StackType } from "@/model/StackType";
import { TableName } from "@/model/schema";

export function useStackType({
  stack,
  includeComingSoon,
}: {
  stack?: Stack | null;
  includeComingSoon?: boolean;
}) {
  const database = useDatabase();
  const [stackType, setStackType] = useState<StackType>();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    if (stack) {
      const stackTypesQuery = database.collections
        .get<StackType>(TableName.STACK_TYPES)
        .query(Q.where("id", stack.stackType.id), Q.take(1));

      const subscription = stackTypesQuery.observe().subscribe((data) => {
        setStackType(data[0] ?? null);
      });

      return () => subscription.unsubscribe();
    }
  }, [database, stack]);

  useEffect(() => {
    if (stackType) {
      const subscription = stackType.categories
        .extend(Q.sortBy("name"))
        .observe()
        .subscribe((data) => {
          setCategories(data ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [stackType]);

  return { stackType, categories };
}
