import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
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
            <Link href={`(tabs)/tools/${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`Included in ${item.allPicks} stack`.concat(
                  item.allPicks !== 1 ? "s" : ""
                )}
                icon={<ToolIcon tool={item} />}
                iconAfter={<ChevronRight size="$1" />}
              />
            </Link>
          );
        }}
      />
      <SuggestionButton suggestion="tool" />
    </YStack>
  );
}
