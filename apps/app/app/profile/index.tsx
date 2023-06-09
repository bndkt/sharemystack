import { Link } from "expo-router";
import { Text, YStack } from "tamagui";
import { useProtectedRoute } from "../../components/providers/AuthProvider";

export default function Index() {
  useProtectedRoute();

  return (
    <YStack>
      <Text>My Stack</Text>
      <Link href="/signin">Sign in</Link>
    </YStack>
  );
}
