import { YStack } from "tamagui";

import { SignIn } from "../../../components/SignIn";
import { useProtectedRoute } from "../../../components/providers/AuthProvider";

export default function Index() {
  useProtectedRoute();

  return (
    <YStack>
      <SignIn />
    </YStack>
  );
}
