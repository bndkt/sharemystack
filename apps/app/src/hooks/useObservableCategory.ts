import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { TableName } from "@/model/schema";

export function useObservableCategory(slug: string) {
  const database = useDatabase();
  const [categoriy, setCategory] = useState<Category>();

  useEffect(() => {
    const categoriesCollection = database.collections.get<Category>(
      TableName.CATEGORIES
    );

    const categoriesObservable = categoriesCollection
      .query(Q.where("slug", slug), Q.take(1))
      .observe();

    const subscription = categoriesObservable.subscribe((newCategories) => {
      setCategory(newCategories[0]);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return categoriy;
}
