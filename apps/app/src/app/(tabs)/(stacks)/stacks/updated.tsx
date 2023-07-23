import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";

export default function FeaturedStacks() {
  const stacks = useObservableStacks({ updated: true, limit: 20 });

  return <StackList stacks={stacks} />;
}
