import { Text, YStack } from "tamagui";

import { CardStack } from "./card/CardStack";
import { CustomSuspense } from "../loading/CustomSuspense";

import { useTools } from "@/hooks/data/useTools";

export function NewTools() {
  const { tools } = useTools({ recentlyAdded: true, limit: 32 });

  return (
    <YStack height={170}>
      <Text
        backgroundColor="$sms"
        color="white"
        paddingVertical="$3"
        paddingHorizontal="$3"
        fontWeight="bold"
      >
        Recently added tools
      </Text>
      <YStack flex={1} overflow="hidden" backgroundColor="$sms">
        <CustomSuspense
          data={tools}
          name="tools"
          component={(tools) => <CardStack tools={tools} />}
        />
      </YStack>
    </YStack>
  );
}
