import { Text, YStack } from "tamagui";

import { useProtectedRoute } from "../../../components/providers/AuthProvider";
import { SignIn } from "../../../components/SignIn";

export default function Index() {
  useProtectedRoute();

  return (
    <YStack>
      <SignIn />
    </YStack>
  );
}
