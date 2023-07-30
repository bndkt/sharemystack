import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Category } from "@/model/Category";
import { Q } from "@nozbe/watermelondb";
import { StackType } from "@/model/StackType";

export function useStackType({
  slug,
  includeComingSoon,
}: {
  slug: string;
  includeComingSoon?: boolean;
}) {
  const database = useDatabase();
  const [stackType, setStackType] = useState<StackType>();
  const [categories, setCategories] = useState<Category[]>();

  let stackTypesQuery = database.collections
    .get<StackType>(TableName.STACK_TYPES)
    .query(Q.where("slug", slug), Q.take(1));

  useEffect(() => {
    const subscription = stackTypesQuery.observe().subscribe((data) => {
      setStackType(data[0] ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

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
