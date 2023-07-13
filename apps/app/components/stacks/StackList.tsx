import { YStack } from "tamagui";

import { List } from "../List";
import { StacksResponse } from "../../lib/database/getStacks";
import { ImageIcon } from "../icons/StackIcon";

export function StackList({
  stacks,
  onRefresh,
  refreshing,
}: {
  stacks: StacksResponse["data"];
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  return (
    <YStack fullscreen>
      <List
        data={stacks}
        href={(item) => `/(stacks)/@${item.slug}`}
        title={(item) => item.name}
        subTitle={(item) => `@${item.slug}`}
        icon={(item) => <ImageIcon src={item.twitter_image_url} />}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </YStack>
  );
}
