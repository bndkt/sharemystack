import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { StackList } from "@/components/stacks/StackList";
import { StacksResponse, getStacks } from "@/lib/database/getStacks";

function StarredStacks() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  function loadData() {
    getStacks({ starred: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading message="Loading starred stacks" />
  ) : (
    <StackList
      stacks={stacks}
      onRefresh={() => {
        setRefreshing(true);
        loadData();
      }}
      refreshing={refreshing}
    />
  );
}

export default withAuth(StarredStacks);
