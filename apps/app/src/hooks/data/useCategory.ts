import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { TableName } from "@/model/schema";
import { Category } from "@/model/Category";
import { Q } from "@nozbe/watermelondb";
import { Tool } from "@/model/Tool";

export function useCategory({ slug }: { slug: string }) {
  const database = useDatabase();
  const [category, setCategory] = useState<Category>();
  const [tools, setTools] = useState<Tool[]>();

  const categoriesQuery = database.collections
    .get<Category>(TableName.CATEGORIES)
    .query(Q.where("slug", slug), Q.take(1));

  useEffect(() => {
    const subscription = categoriesQuery.observe().subscribe((data) => {
      setCategory(data[0] ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  useEffect(() => {
    if (category) {
      const subscription = category.tools
        .extend(Q.sortBy("name"))
        .observe()
        .subscribe((data) => {
          setTools(data ?? null);
        });

      return () => subscription.unsubscribe();
    }
  }, [category]);

  return { category, tools };
}
