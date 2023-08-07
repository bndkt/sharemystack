import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, XStack, YStack } from "tamagui";

import { ShareOptions } from "./ShareOptions";
import { Template1 } from "./templates/Template1";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function Share({
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

  function handleShare() {
    console.log("Sharing ...");

    viewShotRef.current?.capture &&
      viewShotRef.current?.capture().then((uri: string) => {
        console.log("do something with ", uri);
        Sharing.shareAsync(uri);
        releaseCapture(uri);
      });
  }

  return (
    <YStack fullscreen padding="$3">
      <YStack flexGrow={1}>
        <ViewShot
          ref={viewShotRef}
          options={{ format: "png", fileName: "sharemystack.png" }}
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
        <XStack>
          <Button marginTop="$1" themeInverse onPress={handleShare}>
            Share my stack
          </Button>
          <Button marginTop="$1" themeInverse onPress={handleShare}>
            Share my stack
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
