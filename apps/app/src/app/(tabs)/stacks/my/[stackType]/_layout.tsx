import { Slot, Stack, useLocalSearchParams } from "expo-router";

import { List } from "@/components/list";
import { StackPick } from "@/components/stacks/StackPick";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { PicksListItem } from "@/components/picks/PicksListItem";
import { CustomSuspense } from "@/components/loading/CustomSuspense";

export default function Layout() {
  const { stackType: stackTypeSlug } = useLocalSearchParams<{
    stackType: string;
  }>();
  const { user } = useAuth();
  const { stack, picks } = useProfile({
    user,
    stackTypeSlug,
  });

  return (
    <>
      <Stack.Screen options={{ title: `${stack?.stackTypeName} Stack` }} />
      <CustomSuspense
        data={stack}
        name="stack"
        component={(stack) => (
          <List
            data={picks}
            placeholder="You have not selected any tools for this stack"
            renderItem={({ item }) => (
              <PicksListItem stack={stack} pick={item} />
            )}
          />
        )}
      />
      <Slot />
    </>
  );
}
