import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { TableName } from "@/model/schema";

export function useObservablePicks({ limit }: { limit?: number } = {}) {
  const database = useDatabase();
  const [picks, setPicks] = useState<Pick[]>([]);

  useEffect(() => {
    const picksCollection = database.collections.get<Pick>(TableName.PICKS);

    let picksQuery = picksCollection.query(Q.sortBy("updated_at", "desc"));

    if (limit) {
      picksQuery = picksQuery.extend(Q.take(limit));
    }

    const picksObservable = picksQuery.observe();

    const subscription = picksObservable.subscribe((newPicks) => {
      setPicks(newPicks);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return picks;
}
