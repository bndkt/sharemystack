import { useState } from "react";

import { useAuth } from "./useAuth";

import { supabase } from "@/lib/supabase";
import { sync } from "@/lib/sync";

export function useSync() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueued, setRefreshQueued] = useState(false);
  const { user } = useAuth();

  const channel = user ? supabase.channel(`user-${user.id}`) : undefined;
  console.log({ user, channel });

  channel
    ?.on("broadcast", { event: "sync" }, (payload) => {
      console.log("⏱️ Received sync event");
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
          console.log("⏱️ Sending sync event");
          channel
            ?.send({
              type: "broadcast",
              event: "sync",
            })
            .then((response) => {
              console.log("⏱️ Sync event sent", response);
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
