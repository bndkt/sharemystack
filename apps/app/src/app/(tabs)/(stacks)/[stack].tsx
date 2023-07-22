import { Stack, useLocalSearchParams } from "expo-router";
import { H3, Text, XStack, YStack } from "tamagui";

import { List } from "@/components/List";
import { PickItem } from "@/components/stacks/PickItem";
import { Star } from "@/components/stacks/Star";
import { useObservableStack } from "@/hooks/useObservableStack";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.toLowerCase().substring(1);

  if (!slug) throw new Error("Stack not found");

  const { stack, picks } = useObservableStack({
    slug,
    loadPicks: true,
  });

  return stack ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: stack.name ?? "" }} />
      <YStack fullscreen>
        <XStack padding="$3">
          <YStack flexGrow={1}>
            <H3>{stack.name}</H3>
            <Text>@{stack.slug}</Text>
          </YStack>
          <Star stack={stack} />
        </XStack>
        <List
          data={picks}
          renderItem={({ item }) => <PickItem pick={item} />}
        />
      </YStack>
    </>
  ) : null;
}
