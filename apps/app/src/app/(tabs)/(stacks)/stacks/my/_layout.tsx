import { Slot } from "expo-router";
import { YStack } from "tamagui";

import { List } from "@/components/List";
import { withAuth } from "@/components/auth/withAuth";
import { CreateStack } from "@/components/stacks/CreateStack";
import { MyStackHeader } from "@/components/stacks/MyStackHeader";
import { PickItem } from "@/components/stacks/PickItem";
import { useAuth } from "@/hooks/useAuth";
import { useObservableStack } from "@/hooks/useObservableStack";
import { MyStackProvider } from "@/providers/MyStackProvider";

export function MyStack() {
  const { user } = useAuth();

  if (!user) throw new Error("User not found");

  const { stack, picks } = useObservableStack({
    userId: user?.id,
    loadPicks: true,
  });

  return stack ? (
    <MyStackProvider stack={stack}>
      <YStack fullscreen>
        <MyStackHeader stack={stack} refresh={() => {}} />
        <List
          data={picks}
          placeholder="You have not added any tools to your stack yet."
          renderItem={({ item }) => <PickItem pick={item} editable={true} />}
        />
        <Slot />
      </YStack>
    </MyStackProvider>
  ) : (
    <CreateStack refresh={() => {}} />
  );
}

export default withAuth(MyStack);
