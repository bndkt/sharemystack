import { YStack } from "tamagui";

import { List } from "../List";
import { StacksResponse } from "../../lib/database/getStacks";
import { ImageIcon } from "../icons/StackIcon";

export function StackList({ stacks }: { stacks: StacksResponse["data"] }) {
  return (
    <YStack fullscreen>
      <List
        data={stacks}
        href={(item) => `/(stacks)/@${item.slug}`}
        title={(item) => item.name}
        subTitle={(item) => item.website}
        icon={(item) => <ImageIcon src={item.twitter_image_url} />}
      />
    </YStack>
  );
}
