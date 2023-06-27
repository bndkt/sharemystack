import { useEffect, useState } from "react";
import { Spinner } from "tamagui";

import { StacksResponse, getStacks } from "@/lib/database/getStacks";
import { withAuth } from "@/components/auth/withAuth";
import { StackList } from "@/components/stacks/StackList";

function StarredStacks() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  useEffect(() => {
    getStacks({ starred: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
    });
  }, [getStacks, setStacks]);

  return isLoading ? <Spinner /> : <StackList stacks={stacks} />;
}

export default withAuth(StarredStacks);
