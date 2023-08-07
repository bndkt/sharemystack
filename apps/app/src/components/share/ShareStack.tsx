import { Instagram, Share } from "@tamagui/lucide-icons";
import * as Linking from "expo-linking";
import * as MediaLibrary from "expo-media-library";
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
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function shareToInstagram(uri: string) {
    if (!permissionResponse?.granted) {
      await requestPermission();
    }

    if (permissionResponse?.granted) {
      const res = await MediaLibrary.createAssetAsync(uri);
      console.log({ res });
      const shareUrl = `instagram://library?LocalIdentifier=${res.id}`;
      Linking.openURL(shareUrl);
    }
  }

  async function handleCapture(callback: (uri: string) => Promise<void>) {
    console.log("Sharing ...");

    viewShotRef.current?.capture &&
      viewShotRef.current?.capture().then(async (uri: string) => {
        console.log(uri);
        await callback(uri);
        releaseCapture(uri);
      });
  }

  return (
    <YStack fullscreen padding="$3" paddingBottom={insets.bottom}>
      <YStack flexGrow={1}>
        <YStack
          shadowOffset={{ width: 2, height: 2 }}
          shadowColor={"$shadowColor"}
        >
          <ViewShot
            ref={viewShotRef}
            options={{
              format: "png",
              fileName: "sharemystack.png",
              // result: "base64",
            }}
          >
            <Template1
              profile={profile}
              stack={stack}
              picks={picks}
              options={options}
            />
          </ViewShot>
        </YStack>
      </YStack>
      <YStack>
        <ShareOptions options={options} setOptions={setOptions} />
        <XStack space="$3">
          <Button
            marginTop="$1"
            themeInverse
            backgroundColor="#ff7a00"
            onPress={() =>
              handleCapture(async (uri) => {
                await shareToInstagram(uri);
              })
            }
            icon={<Instagram size="$1.5" />}
          />
          <Button
            marginTop="$1"
            themeInverse
            onPress={() =>
              handleCapture(async (uri) => await Sharing.shareAsync(uri))
            }
            icon={<Share size="$1.5" />}
          />
        </XStack>
      </YStack>
    </YStack>
  );
}
