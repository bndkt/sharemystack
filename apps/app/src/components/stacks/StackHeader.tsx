import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H3, Text, XStack, YStack } from "tamagui";

import { Stack } from "@/model/Stack";

export function StackHeader({ stack }: { stack: Stack }) {
  const insets = useSafeAreaInsets();

  return (
    <XStack padding="$3" paddingTop={insets.top}>
      <YStack flexGrow={1}>
        <H3>{stack.name}</H3>
        <Text>@{stack.slug}</Text>
      </YStack>
    </XStack>
  );
}
