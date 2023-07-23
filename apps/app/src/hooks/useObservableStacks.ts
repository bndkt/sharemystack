import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Stack } from "@/model/Stack";
import { TableName } from "@/model/schema";

export function useObservableStacks({
  featured,
  starred,
  updated,
  limit,
}: {
  featured?: boolean;
  starred?: boolean;
  updated?: boolean;
  limit?: number;
}) {
  const database = useDatabase();
  const [stacks, setStacks] = useState<Stack[]>([]);

  useEffect(() => {
    const stacksCollection = database.collections.get<Stack>(TableName.STACKS);

    let stacksQuery = stacksCollection.query();

    if (featured) {
      stacksQuery = stacksQuery.extend(Q.where("is_featured", true));
    }

    if (starred) {
      stacksQuery = stacksQuery.extend(
        Q.on(TableName.STARS, "user_id", Q.notEq(null)),
        Q.sortBy("name")
      );
    }

    if (updated) {
      stacksQuery = stacksQuery.extend(Q.sortBy("updated_at", "desc"));
    }

    if (limit) {
      stacksQuery = stacksQuery.extend(Q.take(limit));
    }

    const stacksObservable = stacksQuery.observe();

    const subscription = stacksObservable.subscribe((newStacks) => {
      setStacks(newStacks);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return stacks;
}
