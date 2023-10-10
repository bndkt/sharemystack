import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, YStack } from "tamagui";

import { SignInWithApple } from "./SignInWithApple";
import { SignInWithTwitter } from "./SignInWithTwitter";

export function SignIn({ standalone }: { standalone?: boolean }) {
  const inlets = useSafeAreaInsets();

  return (
    <YStack
      padding="$3"
      paddingTop={standalone ? inlets.top : undefined}
      space="$3"
      fullscreen
      justifyContent="center"
    >
      <Text textAlign="center" marginBottom="$3">
        Please sign in to use this part of the app.
      </Text>
      <SignInWithTwitter />
      <SignInWithApple />
    </YStack>
  );
}
