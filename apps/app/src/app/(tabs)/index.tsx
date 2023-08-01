import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H3, Text, XStack, YStack } from "tamagui";
import { useIsFocused } from "@react-navigation/native"; // TODO: @react-navigation/native is not a dependency

import { Stream } from "@/components/home/Stream";
import { Logo } from "@/components/Logo";
import { StatusBar } from "expo-status-bar";

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
        <Text padding="$3" paddingTop="$0" fontSize="$5" color="white">
          Curate your personal productivity stack, share it with the world, and
          discover which tools others are using.
        </Text>
      </YStack>
      <YStack flexGrow={1} backgroundColor="$background">
        <Stream />
      </YStack>
      {isFocused && <StatusBar style="light" />}
    </YStack>
  );
}
