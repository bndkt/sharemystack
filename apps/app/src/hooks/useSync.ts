import { useState } from "react";

import { sync } from "@/lib/sync";

export function useSync() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshQueued, setRefreshQueued] = useState(false);

  /* useEffect(() => {
    if (user) {
      const channel = supabase.channel(`user-${user.id}`);

      channel.on("broadcast", { event: "sync" }, (payload) => {
        console.log("⏱️📨 Received sync event", payload);
        // refresh();
      });

      channel.subscribe((status) => {
        console.log("CHANNEL STATUS", status);
      });

      setChannel(channel);

      console.log("Channel set", !!channel);

      return () => {
        channel.unsubscribe();
        setChannel(undefined);
      };
    }
  }, [user]);

  useEffect(() => {
    if (channel && broadcast) {
      console.log("⏱️ Sending sync event", channel.state);
      channel
        .send({
          type: "broadcast",
          event: "sync",
        })
        .then((response) => {
          console.log("⏱️ Sync event sent", response);
        });
      setBroadcast(false);
    }
  }, [broadcast, channel]); */

  function refresh(reset?: boolean) {
    if (!refreshing) {
      console.log("Starting refresh");
      setRefreshing(true);
      sync(reset).finally(() => {
        setRefreshing(false);
        console.log("Refresh finished");
        if (refreshQueued) {
          refresh();
        }
      });
    } else {
      console.log("Already refreshing, queueing refresh");
      setRefreshQueued(true);
    }
  }

  return { refreshing, refresh };
}
