import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H3, Text, YStack } from "tamagui";

// import { Stream } from "@/components/home/Stream";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <YStack fullscreen paddingTop={insets.top}>
      <YStack>
        <H3 padding="$3">Share My Stack</H3>
        <Text padding="$3" paddingTop="$0" fontSize="$5">
          Curate your personal productivity stack, share it with the world, and
          discover which tools others are using.
        </Text>
      </YStack>
      <YStack flexGrow={1}>{/* <Stream /> */}</YStack>
    </YStack>
  );
}
