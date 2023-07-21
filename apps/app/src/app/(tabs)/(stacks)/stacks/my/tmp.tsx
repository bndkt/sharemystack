import { useRouter } from "expo-router";
import { Button, YStack } from "tamagui";

// TODO: Temporary workaround to be able to close the bottom modal (navigating to index doesn't work)

export default function Tmp() {
  const router = useRouter();

  return (
    <YStack padding="$3">
      <Button onPress={() => router.push("/(tabs)/stacks/my/picks")}>
        Add tools to my stack
      </Button>
    </YStack>
  );
}
