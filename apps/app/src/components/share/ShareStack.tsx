import * as Linking from "expo-linking";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Carousel } from "./Carousel";
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

  /* async function shareToFacebook(uri: string) {
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
  } */

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
      <Carousel
        templateProps={{ profile, stack, picks }}
        onShare={handleShare}
      />
    </YStack>
  );
}
