import { useAuth } from "./useAuth";
import { useSync } from "./useSync";

import { supabase } from "@/lib/supabase";

export function useRealtime() {
  const { user } = useAuth();
  const { refresh } = useSync();

  const channel = user ? supabase.channel(`user-${user.id}`) : undefined;

  channel
    ?.on("broadcast", { event: "sync" }, (payload) => {
      console.log(payload);
      refresh();
    })
    .subscribe();

  function broadcastSync() {
    channel?.send({
      type: "broadcast",
      event: "sync",
    });
  }

  return { channel, broadcastSync };
}
