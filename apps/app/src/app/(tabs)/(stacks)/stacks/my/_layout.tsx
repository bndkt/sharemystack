import { Slot } from "expo-router";
import { YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { CreateStack } from "@/components/stacks/CreateStack";
import { MyStackHeader } from "@/components/stacks/MyStackHeader";
import { PickItem } from "@/components/stacks/PickItem";
import { useAuth } from "@/hooks/useAuth";
import { useObservableStack } from "@/hooks/useObservableStack";
import { useSync } from "@/hooks/useSync";
import { MyStackProvider } from "@/providers/MyStackProvider";

export function MyStack() {
  const { user } = useAuth();
  const { refresh, refreshing } = useSync();

  if (!user) throw new Error("User not found");

  const { stack, picks, loading } = useObservableStack({
    userId: user.id,
    loadPicks: true,
  });

  return loading ? (
    <Loading message="Loading stack" />
  ) : stack ? (
    <MyStackProvider stack={stack} picks={picks}>
      <YStack fullscreen>
        <MyStackHeader stack={stack} />
        <List
          data={picks}
          onRefresh={refresh}
          refreshing={refreshing}
          placeholder="You have not added any tools to your stack yet."
          renderItem={({ item }) => <PickItem pick={item} editable={true} />}
        />
        <Slot />
      </YStack>
    </MyStackProvider>
  ) : (
    <CreateStack />
  );
}

export default withAuth(MyStack);
