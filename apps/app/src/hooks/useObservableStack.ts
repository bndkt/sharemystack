import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Stack } from "@/model/Stack";
import { TableName } from "@/model/schema";

export function useObservableStack({ userId }: { userId: string }) {
  const database = useDatabase();
  const [stack, setStack] = useState<Stack>();

  useEffect(() => {
    const stacksCollection = database.collections.get<Stack>(TableName.STACKS);

    const stacksQuery = stacksCollection.query(
      Q.where("user_id", userId),
      Q.take(1)
    );

    const stacksObservable = stacksQuery.observe();

    const subscription = stacksObservable.subscribe((newStacks) => {
      setStack(newStacks[0]);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return stack;
}
