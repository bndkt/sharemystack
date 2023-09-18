import { useIsFocused } from "@react-navigation/native"; // TODO: @react-navigation/native is not a dependency
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H3, XStack, YStack } from "tamagui";

import { Logo } from "@/components/Logo";
import { NewTools } from "@/components/home/NewTools";
import { Stream } from "@/components/home/Stream";

export default function Index() {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  return (
    <YStack fullscreen paddingTop={insets.top} backgroundColor="$sms">
      <YStack>
        <XStack padding="$3" alignItems="center">
          <Logo color="white" width={35} height={35} />
          <H3 color="white" marginLeft="$3">
            Share My Stack
          </H3>
        </XStack>
      </YStack>
      <YStack
        flexGrow={1}
        backgroundColor="$background"
        borderTopWidth="$1"
        borderTopColor="$background"
      >
        <NewTools />
        <Stream />
      </YStack>
      {isFocused && <StatusBar style="light" />}
    </YStack>
  );
}
