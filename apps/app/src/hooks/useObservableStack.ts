import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { Stack } from "@/model/Stack";
import { TableName } from "@/model/schema";

type StackSelector =
  | {
      slug?: never;
      userId: string | null;
      loadPicks?: boolean;
    }
  | {
      slug: string;
      userId?: never;
      loadPicks?: boolean;
    };

export function useObservableStack({ slug, userId, loadPicks }: StackSelector) {
  const database = useDatabase();
  const [stack, setStack] = useState<Stack>();
  const [picks, setPicks] = useState<Pick[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug && !userId) return setLoading(false);

    const stacksCollection = database.collections.get<Stack>(TableName.STACKS);

    const args: Q.Clause[] = [];
    userId && args.push(Q.where("user_id", userId));
    slug && args.push(Q.where("slug", slug));
    args.push(Q.take(1));

    const stacksQuery = stacksCollection.query(args);
    const stacksObservable = stacksQuery.observe();

    const subscription = stacksObservable.subscribe((newStacks) => {
      setStack(newStacks[0]);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [database, userId, slug]);

  useEffect(() => {
    if (stack && loadPicks) {
      const subscription = stack.picks.observe().subscribe((newPicks) => {
        setPicks(newPicks);
      });

      return () => subscription.unsubscribe();
    }
  }, [stack, loadPicks]);

  return { stack, picks, loading };
}
