import { H3, XStack, YStack } from "tamagui";

import { MaterialTopTabs } from "@/components/MaterialTopTabs";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolListItem } from "@/components/tools/ToolListItem";
import { Category } from "@/model/Category";
import { Tool } from "@/model/Tool";

export function ToolLayout({
  tool,
  category,
}: {
  tool: Tool;
  category?: Category;
}) {
  return (
    <YStack fullscreen>
      <XStack padding="$3" alignItems="center">
        <ToolIcon tool={tool} size="$3" />
        <H3 marginLeft="$3" flexGrow={1}>
          {tool.name}
        </H3>
        {category && (
          <ToolListItem category={category} tool={tool} toolPage={true} />
        )}
      </XStack>
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="index" options={{ title: "Home" }} />
        <MaterialTopTabs.Screen name="stacks" options={{ title: "Stacks" }} />
      </MaterialTopTabs>
    </YStack>
  );
}
