import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolsResponse, getTools } from "@/lib/database/getTools";

export default function Tools() {
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);

  function loadData() {
    getTools().then(({ data }) => {
      setTools(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading message="Loading tools" />
  ) : (
    <YStack fullscreen>
      <List
        data={tools}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.name}
              subTitle={`Included in ${item.all_picks} stack`.concat(
                item.all_picks !== 1 ? "s" : ""
              )}
              icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
            />
          );
        }}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
