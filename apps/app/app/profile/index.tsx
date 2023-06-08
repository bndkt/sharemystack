import { Link } from "expo-router";
import { Text, YStack } from "tamagui";

export default function Index() {
  return (
    <YStack>
      <Text>My Stack</Text>
      <Link href="/signin">Sign in</Link>
    </YStack>
  );
}
