import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { TableName } from "@/model/schema";

export function useObservableCategories({
  includeComingSoon,
}: {
  includeComingSoon?: boolean;
} = {}) {
  const database = useDatabase();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoriesCollection = database.collections.get<Category>(
      TableName.CATEGORIES
    );

    let categoriesQuery = categoriesCollection.query(Q.sortBy("name"));

    if (!includeComingSoon) {
      categoriesQuery = categoriesQuery.extend(
        Q.where("is_coming_soon", false)
      );
    }

    const categoriesObservable = categoriesQuery.observe();

    const subscription = categoriesObservable.subscribe((newCategories) => {
      setCategories(newCategories);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return categories;
}
