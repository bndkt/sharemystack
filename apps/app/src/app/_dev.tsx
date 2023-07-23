import { Skull } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, YStack } from "tamagui";

import { sync } from "@/lib/sync";

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <YStack
      fullscreen
      padding="$3"
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
    >
      <YStack flexGrow={1}>
        <Button
          // themeInverse
          marginTop="$3"
          onPress={() => sync(true)}
          backgroundColor="$red10"
          color="$background"
          icon={Skull}
        >
          Nuke local database
        </Button>
      </YStack>
      <Button
        // themeInverse
        marginTop="$3"
        onPress={() => router.push("/")}
      >
        Back to app
      </Button>
    </YStack>
  );
}
