import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { StackList } from "@/components/stacks/StackList";
import { StacksResponse, getStacks } from "@/lib/database/getStacks";

export default function FeaturedStacks() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  useEffect(() => {
    getStacks({ featured: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
    });
  }, [setStacks, getStacks]);

  return isLoading ? <Loading /> : <StackList stacks={stacks} />;
}
