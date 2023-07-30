import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";

export default function UpdatedStacks() {
  const stacks = useObservableStacks({ updated: true });

  return <StackList stacks={stacks} />;
}
