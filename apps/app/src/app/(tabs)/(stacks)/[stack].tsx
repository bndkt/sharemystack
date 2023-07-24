import { Stack, useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { List } from "@/components/list";
import { StackHeaderRight } from "@/components/stacks/StackHeaderRight";
import { StackPick } from "@/components/stacks/StackPick";
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
      <Stack.Screen
        options={{
          headerShown: true,
          title: stack.name,
          // headerTitle: (props) => <StackHeader stack={stack} />,
          // headerBackVisible: true,
          headerRight: () => <StackHeaderRight stack={stack} />,
          // header: (props) => <StackHeader stack={stack} />,
        }}
      />
      <YStack fullscreen>
        <List
          data={picks}
          renderItem={({ item }) => <StackPick pick={item} />}
        />
      </YStack>
    </>
  ) : null;
}
