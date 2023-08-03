import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useEffect, useState } from "react";

import { Pick } from "@/model/Pick";
import { TableName } from "@/model/schema";

export function usePicks({ stream }: { stream?: boolean } = {}) {
  const database = useDatabase();
  const [picks, setPicks] = useState<Pick[]>();

  let picksQuery = database.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.sortBy("updated_at", "desc"));

  // TODO: Solve more elegantly
  if (stream) {
    picksQuery = picksQuery.extend(
      Q.where("profile_name", Q.notEq(null)),
      Q.where("profile_name", Q.notEq(""))
    );
  }

  useEffect(() => {
    const subscription = picksQuery.observe().subscribe((data) => {
      setPicks(data ?? null);
    });

    return () => subscription.unsubscribe();
  }, [database]);

  return { picks };
}
