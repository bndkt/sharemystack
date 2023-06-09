import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, YStack } from "tamagui";

export function Modal({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();
  const router = useRouter();

  const dismiss = () =>
    navigation.canGoBack() ? router.back() : router.push("/");

  return (
    <SafeAreaView edges={["right", "bottom", "left"]} style={{ flex: 1 }}>
      <YStack flex={1} alignItems="center">
        <YStack flex={1} justifyContent="center" width="100%">
          {children}
        </YStack>
        <YStack>
          <Button onPress={dismiss} size="$3">
            Dismiss
          </Button>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
