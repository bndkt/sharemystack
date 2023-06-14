import { useEffect, useState } from "react";
import { Spinner } from "tamagui";

import { StacksResponse, getStacks } from "../../../../lib/database/getStacks";
import { StackList } from "../../../../components/stacks/StackList";

export default function FeaturedStacks() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  useEffect(() => {
    getStacks({ featured: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
    });
  }, [setStacks, getStacks]);

  return isLoading ? <Spinner /> : <StackList stacks={stacks} />;
}
