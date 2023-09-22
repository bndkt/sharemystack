import * as Linking from "expo-linking";
import { Button } from "tamagui";

import { Tool } from "@/model/Tool";
import { Download } from "@tamagui/lucide-icons";

export function ToolLink({ tool }: { tool: Tool }) {
  function openUrl(link: string) {
    Linking.canOpenURL(link).then(
      (supported) => {
        supported && Linking.openURL(link);
      },
      (err) => console.log(err),
    );
  }

  if (tool.affiliateLink) {
    const link = tool.affiliateLink;

    return (
      <Button
        onPress={() => openUrl(link)}
        themeInverse
        icon={<Download size="$1" />}
      >
        {`Get ${tool.name}`}
      </Button>
    );
  } else if (tool.appStore) {
    const link = `itms-apps://apps.apple.com/us/app/${tool.appStore}`;

    return (
      <Button
        onPress={() => openUrl(link)}
        themeInverse
        icon={<Download size="$1" />}
      >
        {`Get ${tool.name}`}
      </Button>
    );
  } else if (tool.website) {
    const link = tool.website;

    return (
      <Button
        onPress={() => openUrl(link)}
        themeInverse
        icon={<Download size="$1" />}
      >
        {`Get ${tool.name}`}
      </Button>
    );
  }
}
