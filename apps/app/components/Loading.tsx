import { Spinner, YStack } from "tamagui";

export function Loading() {
  return (
    <YStack fullscreen={true} justifyContent="center">
      <Spinner color="#f43f5e" />
    </YStack>
  );
}
