import { Spinner, Text, YStack, getTokens } from "tamagui";

export function Loading({ message }: { message?: string }) {
  message ??= "Loading";

  return (
    <YStack fullscreen={true} justifyContent="center">
      <Spinner />
      <Text textAlign="center" marginTop="$6">
        {message} …
      </Text>
    </YStack>
  );
}
