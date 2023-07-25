import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { StackIcon } from "@/components/icons/StackIcon";
import { List } from "@/components/list";
import { Stack } from "@/model/Stack";

export function StackList({ stacks }: { stacks: Stack[] }) {
  return (
    <YStack fullscreen>
      <List
        data={stacks}
        renderItem={({ item }) => {
          return (
            <Link href={`/(tabs)/(stacks)/@${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`@${item.slug}`}
                icon={<StackIcon stack={item} />}
                iconAfter={<ChevronRight size="$1" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
