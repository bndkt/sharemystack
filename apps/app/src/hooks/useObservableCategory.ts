import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Category } from "@/model/Category";
import { Tool } from "@/model/Tool";
import { TableName } from "@/model/schema";

export function useObservableCategory({
  slug,
  loadTools,
}: {
  slug: string;
  loadTools?: boolean;
}) {
  const database = useDatabase();
  const [category, setCategory] = useState<Category>();
  const [tools, setTools] = useState<Tool[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoriesCollection = database.collections.get<Category>(
      TableName.CATEGORIES
    );

    const categoriesObservable = categoriesCollection
      .query(Q.where("slug", Q.like(slug)), Q.take(1))
      .observe();

    const subscription = categoriesObservable.subscribe((newCategories) => {
      setCategory(newCategories[0]);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [database, slug]);

  useEffect(() => {
    if (category && loadTools) {
      const subscription = category.tools.observe().subscribe((newTools) => {
        setTools(newTools);
      });

      return () => subscription.unsubscribe();
    }
  }, [category, loadTools]);

  return { category, tools, loading };
}
