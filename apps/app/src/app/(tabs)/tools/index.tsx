import { ListItem, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { List } from "@/components/list";
import { useObservableTools } from "@/hooks/useObservableTools";

export default function Tools() {
  const tools = useObservableTools();

  return (
    <YStack fullscreen>
      <List
        data={tools}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.name}
              subTitle={`Included in ${item.allPicks} stack`.concat(
                item.allPicks !== 1 ? "s" : ""
              )}
              icon={<ToolIcon tool={item} />}
            />
          );
        }}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
