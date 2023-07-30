import { MessageSquare } from "@tamagui/lucide-icons";
import { YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import User from "@/components/settings/User";

export default function Index() {
  return (
    <YStack fullscreen>
      <YStack flexGrow={1}>
        <User />
      </YStack>
      <YStack>
        <SuggestionButton
          text="Give Feedback"
          icon={<MessageSquare size="$1" />}
        />
      </YStack>
    </YStack>
  );
}
