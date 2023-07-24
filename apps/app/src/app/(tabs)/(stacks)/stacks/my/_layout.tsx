import { Slot } from "expo-router";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { List } from "@/components/list";
import { CreateStack } from "@/components/myStack/CreateStack";
import { MyStackHeader } from "@/components/myStack/MyStackHeader";
import { StackPick } from "@/components/stacks/StackPick";
import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";

export function MyStack() {
  const { stack, picks, isLoadingStack } = useAuth();
  const { refresh, refreshing } = useSync();

  return isLoadingStack ? (
    <Loading message="Loading stack" />
  ) : stack ? (
    <YStack fullscreen>
      <MyStackHeader stack={stack} />
      <List
        data={picks}
        onRefresh={refresh}
        refreshing={refreshing}
        placeholder="You have not added any tools to your stack yet."
        renderItem={({ item }) => <StackPick pick={item} editable={true} />}
      />
      <Slot />
    </YStack>
  ) : (
    <CreateStack />
  );
}

export default withAuth(MyStack);
