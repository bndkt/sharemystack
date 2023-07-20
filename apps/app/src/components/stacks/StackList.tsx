import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { ImageIcon } from "@/components/icons/StackIcon";
import { StacksResponse } from "@/lib/database/getStacks";
import { Stack } from "@/model/Stack";

export function StackList({
  stacks,
  onRefresh,
  refreshing,
}: {
  stacks: StacksResponse["data"] | Stack[];
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  return (
    <YStack fullscreen>
      <List
        data={stacks}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => {
          return (
            <Link href={`/(stacks)/@${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`@${item.slug}`}
                icon={<ImageIcon src={item.twitter_image_url} />}
                iconAfter={<ChevronRight size="$1" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
