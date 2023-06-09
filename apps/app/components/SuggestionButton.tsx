import * as WebBrowser from "expo-web-browser";
import { Button } from "tamagui";

import { config } from "../lib/config";
import { Plus } from "@tamagui/lucide-icons";

export function SuggestionButton() {
  return (
    <Button
      onPress={() => {
        WebBrowser.openBrowserAsync(config.formsLink);
      }}
      icon={<Plus />}
      margin="$3"
    >
      Suggest new tool
    </Button>
  );
}
