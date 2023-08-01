import { PlusCircle } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, YStack } from "tamagui";

export default function Index() {
  const { stackType: stackTypeSlug } = useLocalSearchParams<{
    stackType: string;
  }>();
  const router = useRouter();

  return (
    <YStack padding="$3">
      <Button
        onPress={() => router.push(`/(tabs)/stacks/my/${stackTypeSlug}/picks`)}
        icon={<PlusCircle size="$1" />}
      >
        Add tools to this stack
      </Button>
    </YStack>
  );
}
