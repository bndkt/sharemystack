import { MessageSquare } from "@tamagui/lucide-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H3, Text, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <YStack>
        <H3 padding="$3">Welcome to Share My Stack</H3>
        <Text padding="$3">
          This app is very much work in progress. I'm releasing it as a MVP
          (Minimum Viable Product). That means that it's not finished yet, but
          the very basic functionality is there and you can give it a try!
        </Text>
        <Button
          margin="$3"
          onPress={() => router.push("/stacks/my")}
          backgroundColor="$sms"
        >
          Go to my stack
        </Button>
        <SuggestionButton text="Give Feedback" icon={<MessageSquare />} />
      </YStack>
    </SafeAreaView>
  );
}
