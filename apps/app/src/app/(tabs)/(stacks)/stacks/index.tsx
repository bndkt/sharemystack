import { StackList } from "@/components/stacks/StackList";
import { useObservableStacks } from "@/hooks/useObservableStacks";

export default function FeaturedStacks() {
  const stacks = useObservableStacks({ featured: true });

  return <StackList stacks={stacks} />;
}
