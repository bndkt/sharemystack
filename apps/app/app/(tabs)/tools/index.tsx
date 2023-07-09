import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { ToolList } from "@/components/tools/ToolList";
import { ToolsResponse, getTools } from "@/lib/database/getTools";

export default function Tools() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);

  function loadData() {
    getTools().then(({ data }) => {
      setTools(data);
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
    <ToolList
      tools={tools}
      onRefresh={() => {
        setRefreshing(true);
        loadData();
      }}
      refreshing={refreshing}
    />
  );
}
