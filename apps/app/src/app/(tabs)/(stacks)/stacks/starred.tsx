import { withAuth } from "@/components/auth/withAuth";
import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";

export function StarredStacks() {
  const stacks = useObservableStacks({ starred: true });

  return <StackList stacks={stacks} />;
}

export default withAuth(StarredStacks);
