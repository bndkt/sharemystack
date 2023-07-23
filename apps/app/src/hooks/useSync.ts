import { useState } from "react";

import { useAuth } from "./useAuth";

import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";

export function useSync() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueued, setRefreshQueued] = useState(false);
  const { user } = useAuth();

  const channel = user ? supabase.channel(`user-${user.id}`) : undefined;

  channel
    ?.on("broadcast", { event: "sync" }, (payload) => {
      console.log(payload);
      refresh();
    })
    .subscribe();

  function refresh(reset?: boolean) {
    if (!refreshing) {
      console.log("Starting refresh");
      setRefreshing(true);
      sync(reset).finally(() => {
        setRefreshing(false);
        console.log("Refresh finished");
        if (refreshQueued) {
          refresh();
        } else {
          channel?.send({
            type: "broadcast",
            event: "sync",
          });
        }
      });
    } else {
      console.log("Already refreshing, queueing refresh");
      setRefreshQueued(true);
    }
  }

  return { refreshing, refresh };
}
