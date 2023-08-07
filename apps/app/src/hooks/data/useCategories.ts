import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { TableName } from "@/model/schema";

export function useCategories() {
  const database = useDatabase();
  const [categories, setCategories] = useState<Category[]>();

  const categoriesQuery = database.collections
    .get<Category>(TableName.CATEGORIES)
    .query(Q.sortBy("name"));

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setCategories(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { categories };
}
