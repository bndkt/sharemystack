import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolsResponse, getTools } from "@/lib/database/getTools";
import { List } from "@/components/List";
import { ToolIcon } from "@/components/icons/ToolIcon";

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
    <Loading />
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
