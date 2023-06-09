import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";

import { config } from "../lib/config";
import { Lightbulb, Plus, PlusCircle } from "@tamagui/lucide-icons";

export function SuggestionButton() {
  return (
    <Button
      onPress={() => {
        WebBrowser.openBrowserAsync(config.formsLink);
      }}
      icon={<PlusCircle />}
      margin="$3"
    >
      Suggest new tool
    </Button>
  );
}
