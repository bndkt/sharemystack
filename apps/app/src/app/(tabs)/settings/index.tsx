import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, YStack } from "tamagui";

import User from "@/components/settings/User";

export default function Index() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <YStack fullscreen paddingTop={insets.top}>
      <YStack flexGrow={1}>
        <User />
      </YStack>
      <YStack padding="$3">
        <Button
          // themeInverse
          marginTop="$3"
          onPress={() => router.push("/_dev")}
          // borderColor="$red10"
          color="$red10"
        >
          Development Settings
        </Button>
      </YStack>
    </YStack>
  );
}
