import { useEffect, useState } from "react";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
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
    <YStack fullscreen>
      <ToolList
        tools={tools}
        onRefresh={() => {
          setRefreshing(true);
          loadData();
        }}
        refreshing={refreshing}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
