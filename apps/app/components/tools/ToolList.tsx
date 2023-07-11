import { List } from "../List";
import { ToolsResponse } from "../../lib/database/getTools";
import { ToolIcon } from "../icons/ToolIcon";

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
      href={!onPress ? (item) => `/tools/${item.slug}` : undefined}
      onPress={onPress ? (item) => onPress(item.id) : undefined}
      title={(item) => item.name}
      subTitle={(item) =>
        `Included in ${item.all_picks} stack`.concat(
          item.all_picks !== 1 ? "s" : ""
        )
      }
      icon={(item) => <ToolIcon svgXml={item.icon} width="24" height="24" />}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}
