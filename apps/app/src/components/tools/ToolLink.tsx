import * as Linking from "expo-linking";
import { Button } from "tamagui";

import { Tool } from "@/model/Tool";

export function ToolLink({ tool }: { tool: Tool }) {
  function appStore(appStore: string) {
    const link = `itms-apps://apps.apple.com/us/app/${appStore}`;

    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err)
    );
  }

  if (tool.affiliateLink) {
    return (
      <Button onPress={() => Linking.openURL(tool.affiliateLink)} themeInverse>
        {`Get ${tool.name}`}
      </Button>
    );
  } else if (tool.appStore) {
    return (
      <Button onPress={() => appStore(tool.appStore)} themeInverse>
        {`Get ${tool.name}`}
      </Button>
    );
  } else if (tool.website) {
    return (
      <Button onPress={() => Linking.openURL(tool.website)} themeInverse>
        {`Get ${tool.name}`}
      </Button>
    );
  }
}
