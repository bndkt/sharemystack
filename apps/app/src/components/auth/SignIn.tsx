import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { SignInWithApple } from "./SignInWithApple";
import { SignInWithTwitter } from "./SignInWithTwitter";

export function SignIn({ standalone }: { standalone?: boolean }) {
  const inlets = useSafeAreaInsets();
  return (
    <YStack
      padding="$3"
      paddingTop={standalone ? inlets.top : undefined}
      space="$3"
    >
      <SignInWithTwitter />
      <SignInWithApple />
    </YStack>
  );
}
