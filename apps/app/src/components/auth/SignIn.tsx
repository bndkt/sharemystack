import { YStack } from "tamagui";

import { SignInWithApple } from "./SignInWithApple";
import { SignInWithTwitter } from "./SignInWithTwitter";

export function SignIn() {
  return (
    <YStack padding="$3" space="$3">
      <SignInWithTwitter />
      <SignInWithApple />
    </YStack>
  );
}
