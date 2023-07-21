import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { TableName } from "@/model/schema";

export function useObservableCategory(slug: string) {
  const database = useDatabase();
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoriesCollection = database.collections.get<Category>(
      TableName.CATEGORIES
    );

    const categoriesObservable = categoriesCollection
      .query(Q.where("slug", slug), Q.take(1))
      .observe();

    const subscription = categoriesObservable.subscribe((newCategories) => {
      setCategory(newCategories[0]);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [database, slug, setCategory, setLoading]);

  return { category, loading };
}
