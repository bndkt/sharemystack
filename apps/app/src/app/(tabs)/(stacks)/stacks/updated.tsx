import { useEffect } from "react";

import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";
import { useRefresh } from "@/hooks/useRefresh";

export default function FeaturedStacks() {
  const stacks = useObservableStacks({ updated: true, limit: 20 });
  const { refresh, refreshing } = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <StackList stacks={stacks} onRefresh={refresh} refreshing={refreshing} />
  );
}
