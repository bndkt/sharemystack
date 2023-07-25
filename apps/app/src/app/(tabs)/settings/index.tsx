import { MessageSquare } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import User from "@/components/settings/User";

export default function Index() {
  const router = useRouter();

  return (
    <YStack fullscreen>
      <YStack flexGrow={1}>
        <User />
      </YStack>
      <YStack>
        <SuggestionButton text="Give Feedback" icon={<MessageSquare />} />
        <Button
          // themeInverse
          marginHorizontal="$3"
          marginBottom="$3"
          onPress={() => router.push("/_dev")}
          // borderColor="$red10"
          color="$red10"
        >
          Development Settings
        </Button>
      </YStack>
    </YStack>
  );
}
