import { Slot, Stack, useLocalSearchParams } from "expo-router";

import { List } from "@/components/list";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { PicksListItem } from "@/components/picks/PicksListItem";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function Layout() {
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();
  const { user } = useAuth();
  const { stack, picks } = useProfile({
    user,
    stackId,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: `${stack?.stackTypeName} Stack`,
        }}
      />
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
