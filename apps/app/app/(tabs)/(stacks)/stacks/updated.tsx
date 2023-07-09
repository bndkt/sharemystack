import { useEffect, useState } from "react";

import { StackList } from "@/components/stacks/StackList";
import { StacksResponse, getStacks } from "@/lib/database/getStacks";
import { Loading } from "@/components/Loading";

export default function UpdatedStacks() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stacks, setStacks] = useState<StacksResponse["data"]>(null);

  function loadData() {
    getStacks({ updated: true }).then(({ data }) => {
      setStacks(data);
      setLoading(false);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading />
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
