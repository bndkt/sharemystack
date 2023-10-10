import { PlusCircle, Share } from "@tamagui/lucide-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, YStack } from "tamagui";

export default function Index() {
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();
  const router = useRouter();

  return (
    <YStack padding="$3" gap="$3">
      <Button
        onPress={() => router.push(`/(tabs)/my/${stackId}/picks`)}
        icon={<PlusCircle size="$1" />}
      >
        Add tools to this stack
      </Button>

      <Button
        onPress={() => {
          router.push(`/(tabs)/my/share/${stackId}`);
        }}
        icon={<Share size="$1" />}
        backgroundColor="$sms"
        color="white"
      >
        Share this stack
      </Button>
    </YStack>
  );
}
