import { Trash2 } from "@tamagui/lucide-icons";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { SwipeableRow } from "@/components/SwipeableRow";
import { withAuth } from "@/components/auth/withAuth";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { CreateStack } from "@/components/stacks/CreateStack";
import { MyStackHeader } from "@/components/stacks/MyStackHeader";
import { PickItem } from "@/components/stacks/PickItem";
import { useAuth } from "@/hooks/useAuth";
import { useMyStack } from "@/hooks/useMyStack";
import { useObservableStack } from "@/hooks/useObservableStack";
import { Pick } from "@/model/Pick";
import { MyStackProvider } from "@/providers/MyStackProvider";

export function MyStack() {
  const { user } = useAuth();
  const [picks, setPicks] = useState<Pick[]>();
  const { removePick } = useMyStack();

  if (!user) throw new Error("User not found");

  const stack = useObservableStack({ userId: user?.id });

  useEffect(() => {
    if (stack) {
      const subscription = stack.picks.observe().subscribe((newPicks) => {
        setPicks(newPicks);
      });

      return () => subscription.unsubscribe();
    }
  }, [stack, setPicks]);

  return stack ? (
    <MyStackProvider stack={stack}>
      <YStack fullscreen>
        <MyStackHeader stack={stack} refresh={() => {}} />
        <List
          data={picks}
          placeholder="You have not added any tools to your stack yet."
          renderItem={({ item }) => <PickItem pick={item} />}
        />
        <Slot />
      </YStack>
    </MyStackProvider>
  ) : (
    <CreateStack refresh={() => {}} />
  );
}

export default withAuth(MyStack);

{
  /* <MyStackProvider stack={stack} addPick={addPick} removePick={removePick}>
      <YStack fullscreen>
        <MyStackHeader stack={stack} refresh={() => setRefresh(true)} />
        <List
          data={stack.picks_view}
          placeholder="You have not added any tools to your stack yet."
          renderItem={({ item }) => {
            return (
              <SwipeableRow
                rightActions={[
                  {
                    text: <Trash2 color="white" />,
                    color: "$red10",
                    onPress: () =>
                      item.tool_id ? removePick(item.tool_id) : undefined,
                  },
                ]}
              >
                <ListItem
                  title={item.toolName}
                  subTitle={item.categoryName}
                  icon={
                    <ToolIcon svgXml={item.toolIcon} width="36" height="36" />
                  }
                />
              </SwipeableRow>
            );
          }}
        />
        <Slot />
      </YStack>
        </MyStackProvider> */
}
