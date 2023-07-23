import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { useObservableTools } from "@/hooks/useObservableTools";

export default function Tools() {
  const tools = useObservableTools();
  const insets = useSafeAreaInsets();

  return (
    <YStack fullscreen paddingTop={insets.top}>
      <List
        data={tools}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.name}
              subTitle={`Included in ${item.allPicks} stack`.concat(
                item.allPicks !== 1 ? "s" : ""
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
