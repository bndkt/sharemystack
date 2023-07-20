import { PlusCircle } from "@tamagui/lucide-icons";
import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";

import { config } from "@/lib/config";

export function SuggestionButton({
  suggestion = "tool",
  text,
  icon,
}: {
  suggestion?: string;
  text?: string;
  icon?: JSX.Element;
}) {
  return (
    <Button
      onPress={() => {
        WebBrowser.openBrowserAsync(config.feedbackLink);
      }}
      icon={icon ?? <PlusCircle />}
      margin="$3"
    >
      {text ?? `Suggest new ${suggestion}`}
    </Button>
  );
}
