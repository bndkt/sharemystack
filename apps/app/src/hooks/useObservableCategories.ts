import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { TableName } from "@/model/schema";

export function useObservableCategories() {
  const database = useDatabase();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const categoriesCollection = database.collections.get<Category>(
      TableName.CATEGORIES
    );
    const categoriesObservable = categoriesCollection.query().observe();

    const subscription = categoriesObservable.subscribe((newCategories) => {
      setCategories(newCategories);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return categories;
}
