import { Instagram, Share } from "@tamagui/lucide-icons";
import * as Linking from "expo-linking";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, XStack, YStack, useThemeName } from "tamagui";

import { Carousel } from "./Carousel";
import { ShareOptions } from "./ShareOptions";
import { Target } from "./templates";

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
  const themeName = useThemeName();

  const viewShotRef = useRef<ViewShot>(null);
  const [options, setOptions] = useState<ShareOptions>({
    showTitle: true,
    darkMode: themeName === "dark",
  });
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
      await Linking.openURL(shareUrl).catch(async () => {
        await Sharing.shareAsync(uri);
      });
    } else {
      await Sharing.shareAsync(uri);
    }
  }

  async function shareToFacebook(uri: string) {
    if (!permissionResponse?.granted) {
      await requestPermission();
    }

    if (permissionResponse?.granted) {
      const res = await MediaLibrary.createAssetAsync(uri);
      console.log({ res });
      const shareUrl = `fb://library?LocalIdentifier=${res.id}`;
      await Linking.openURL(shareUrl).catch(async () => {
        await Sharing.shareAsync(uri);
      });
    } else {
      await Sharing.shareAsync(uri);
    }
  }

  async function handleShare({ uri, target }: { uri: string; target: Target }) {
    console.log("Share!", { uri, target });
    switch (target) {
      case "instagram":
        await shareToInstagram(uri);
        break;
      default:
        await Sharing.shareAsync(uri);
    }
  }

  return (
    <YStack fullscreen paddingBottom={insets.bottom}>
      <YStack flexGrow={1}>
        <Carousel
          templateProps={{ profile, stack, picks, options }}
          onShare={handleShare}
        />
      </YStack>
      <ShareOptions options={options} setOptions={setOptions} />
      {/* <ViewShot
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
      <YStack padding="$3">
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
      </YStack> */}
    </YStack>
  );
}
