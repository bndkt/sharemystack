import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, XStack, YStack } from "tamagui";
import Share, { ShareSingleOptions, Social } from "react-native-share";

import { ShareOptions } from "./ShareOptions";
import { Template1 } from "./templates/Template1";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { Instagram } from "@tamagui/lucide-icons";

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

  function handleShare(callback: (uri: string) => void) {
    console.log("Sharing ...");

    viewShotRef.current?.capture &&
      viewShotRef.current?.capture().then((uri: string) => {
        callback(uri);
        releaseCapture(uri);
      });
  }

  return (
    <YStack fullscreen padding="$3">
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
            onPress={() =>
              handleShare(async (uri) => {
                uri = uri.replace(/(\r\n|\n|\r)/gm, "");
                const shareOptions: ShareSingleOptions = {
                  social: Share.Social["INSTAGRAM"] as Social,
                  url: `data:image/png;base64,${uri}`,
                  type: "image/*",
                };
                const shareResponse = await Share.shareSingle(shareOptions);
                shareOptions.url = shareOptions.url?.substring(0, 25);
                console.log({ shareOptions });
              })
            }
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
