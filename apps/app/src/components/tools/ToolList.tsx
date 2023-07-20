import { ListItem } from "tamagui";

import { List } from "@/components/List";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolsResponse } from "@/lib/database/getTools";

export function ToolList({
  tools,
  onPress,
  onRefresh,
  refreshing,
}: {
  tools: ToolsResponse["data"];
  onPress?: (tool: string | null) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  return (
    <List
      data={tools}
      onRefresh={onRefresh}
      refreshing={refreshing}
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
  );
}
