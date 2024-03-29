import { DatabaseBackup, DownloadCloud } from "@tamagui/lucide-icons";
import * as Application from "expo-application";
import * as Linking from "expo-linking";
import * as Updates from "expo-updates";
import { useState } from "react";
import { Button, Spinner, Text, YStack } from "tamagui";

import { useSync } from "@/hooks/useSync";

export default function Debug() {
  const [isFetchingUpdate, setIsFetchingUpdate] = useState(false);
  const { reset } = useSync();

  async function onFetchUpdateAsync() {
    setIsFetchingUpdate(true);
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }

      setIsFetchingUpdate(false);
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
      setIsFetchingUpdate(false);
    }
  }

  return (
    <YStack fullscreen padding="$3" space="$3">
      <Button
        onPress={onFetchUpdateAsync}
        disabled={isFetchingUpdate}
        icon={isFetchingUpdate ? <Spinner /> : <DownloadCloud size="$1" />}
      >
        Check for updates
      </Button>
      <Button onPress={() => reset()} icon={<DatabaseBackup size="$1" />}>
        Reset local database
      </Button>
      <YStack gap="$3" flexGrow={1}>
        {Application.nativeBuildVersion && (
          <Text textAlign="center" color="$gray10">
            Build: {Application.nativeBuildVersion} ({Updates.runtimeVersion}
            {Updates.channel && `, ${Updates.channel}`})
          </Text>
        )}
        {Updates.updateId && (
          <Text textAlign="center" color="$gray10">
            Update: {Updates.updateId}
          </Text>
        )}
      </YStack>
      <Button
        unstyled
        textAlign="center"
        color="$gray10"
        marginBottom="$3"
        onPress={() =>
          Linking.openURL(`https://bndkt.com/?utm_source=sharemystack`)
        }
      >
        Made by bndkt
      </Button>
    </YStack>
  );
}
