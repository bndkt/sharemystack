import { useEffect } from "react";

import { withAuth } from "@/components/auth/withAuth";
import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";
import { useRefresh } from "@/hooks/useRefresh";

export function StarredStacks() {
  const stacks = useObservableStacks({ starred: true });
  const { refresh, refreshing } = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <StackList stacks={stacks} onRefresh={refresh} refreshing={refreshing} />
  );
}

export default withAuth(StarredStacks);
