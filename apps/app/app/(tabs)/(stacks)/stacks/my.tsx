import { Button, Text, YStack } from "tamagui";

export default function Index() {
  return (
    <YStack padding="$3">
      <Text marginBottom="$3" textAlign="center">
        You have not yet created your stack!
      </Text>
      <Button>Create my stack</Button>
    </YStack>
  );
}
