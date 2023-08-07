import { Instagram } from "@tamagui/lucide-icons";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, XStack, YStack } from "tamagui";

import { ShareOptions } from "./ShareOptions";
import { Template1 } from "./templates/Template1";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function ShareStack({
  profile,
  stack,
  picks,
}: {
  profile: Profile;
  stack: Stack;
  picks: Pick[];
}) {
  const viewShotRef = useRef<ViewShot>(null);
  const [options, setOptions] = useState<ShareOptions>({ showTitle: true });
  const insets = useSafeAreaInsets();

  function handleShare(callback: (uri: string) => void) {
    console.log("Sharing ...");

    viewShotRef.current?.capture &&
      viewShotRef.current?.capture().then((uri: string) => {
        callback(uri);
        releaseCapture(uri);
      });
  }

  return (
    <YStack fullscreen padding="$3" paddingBottom={insets.bottom}>
      <YStack flexGrow={1}>
        <ViewShot
          ref={viewShotRef}
          options={{
            format: "png",
            fileName: "sharemystack.png",
            result: "base64",
          }}
          style={{ borderColor: "black", borderWidth: 1 }}
        >
          <Template1
            profile={profile}
            stack={stack}
            picks={picks}
            options={options}
          />
        </ViewShot>
      </YStack>
      <YStack>
        <ShareOptions options={options} setOptions={setOptions} />
        <XStack space="$3">
          <Button
            marginTop="$1"
            themeInverse
            onPress={() => {}}
            icon={<Instagram size="$1.5" />}
          />
          <Button
            marginTop="$1"
            themeInverse
            onPress={() => handleShare((uri) => Sharing.shareAsync(uri))}
          >
            Share my stack
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
