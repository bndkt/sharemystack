import { YStack } from "tamagui";

import { List } from "../List";
import { SuggestionButton } from "../SuggestionButton";
import { ToolsResponse } from "../../lib/database/getTools";
import { ToolIcon } from "../icons/ToolIcon";

export function ToolList({ tools }: { tools: ToolsResponse["data"] }) {
  return (
    <YStack fullscreen>
      <List
        data={tools}
        href={(item) => `/tools/@${item.slug}`}
        title={(item) => item.name}
        subTitle={(item) => item.website}
        icon={(item) => <ToolIcon svgXml={item.icon} width="24" height="24" />}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
