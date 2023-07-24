import { Share as ShareIcon } from "@tamagui/lucide-icons";
import { Share } from "react-native";
import { Button, XStack } from "tamagui";

import { Star } from "./Star";

import { config } from "@/lib/config";
import { Stack } from "@/model/Stack";

export function StackHeaderRight({ stack }: { stack: Stack }) {
  return (
    <XStack>
      <Star stack={stack} />
      <Button
        icon={<ShareIcon size="$1" />}
        unstyled
        justifyContent="center"
        padding="$3"
        onPress={async () => {
          await Share.share({
            url: `${config.domain}/@${stack.slug}`,
          });
        }}
      />
    </XStack>
  );
}
