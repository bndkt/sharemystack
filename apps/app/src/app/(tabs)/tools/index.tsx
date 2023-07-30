import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolIcon } from "@/components/tools/ToolIcon";
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
            <Link href={`(tabs)/tools/${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`Included in ${item.allPicks} stack`.concat(
                  item.allPicks !== 1 ? "s" : ""
                )}
                icon={<ToolIcon tool={item} size="$1.5" />}
                iconAfter={<ChevronRight size="$1.5" />}
              />
            </Link>
          );
        }}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
