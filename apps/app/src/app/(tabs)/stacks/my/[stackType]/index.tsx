import { useRouter } from "expo-router";
import { Button, YStack } from "tamagui";

export default function Index() {
  const router = useRouter();

  return (
    <YStack padding="$3">
      <Button onPress={() => router.push("/(tabs)/stacks/my/picks")}>
        Add tools to my stack
      </Button>
    </YStack>
  );
}
