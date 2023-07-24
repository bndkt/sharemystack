import { Avatar } from "tamagui";

import { Stack } from "@/model/Stack";

export function StackIcon({ stack }: { stack: Stack }) {
  return (
    <Avatar circular size="$3">
      {stack.twitterImageUrl && (
        <Avatar.Image
          source={{ uri: stack.twitterImageUrl, width: 400, height: 400 }}
        />
      )}
      <Avatar.Fallback backgroundColor="black" delayMs={1000} />
    </Avatar>
  );
}
