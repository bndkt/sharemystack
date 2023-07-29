import { DownloadCloud, Skull } from "@tamagui/lucide-icons";
import * as Updates from "expo-updates";
import { Button, YStack } from "tamagui";

import { sync } from "@/lib/sync";

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    alert(`Error fetching latest Expo update: ${error}`);
  }
}

export default function Debug() {
  return (
    <YStack fullscreen padding="$3" space="$3">
      <Button onPress={onFetchUpdateAsync} icon={DownloadCloud}>
        Check for updates
      </Button>
      <Button onPress={() => sync(true)} icon={Skull}>
        Nuke local database
      </Button>
    </YStack>
  );
}
