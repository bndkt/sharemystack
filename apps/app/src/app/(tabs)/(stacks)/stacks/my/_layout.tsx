import { Trash2 } from "@tamagui/lucide-icons";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { SwipeableRow } from "@/components/SwipeableRow";
import { withAuth } from "@/components/auth/withAuth";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { CreateStack } from "@/components/stacks/CreateStack";
import { MyStackHeader } from "@/components/stacks/MyStackHeader";
import { useAuth } from "@/hooks/useAuth";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";
import { MyStackProvider } from "@/providers/MyStackProvider";

export function MyStack() {
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && (!stack || refresh)) {
      getStack({ user: user.id }).then(({ data }) => {
        setStack(data);
        setLoading(false);
        setRefresh(false);
      });
    }
  }, [user, stack, refresh]);

  function addPick(toolId: string, categoryId: string) {
    console.log("addPick", toolId, categoryId);

    if (stack?.id) {
      const query = supabase.from("picks").insert({
        stack_id: stack.id,
        tool_id: toolId,
        category_id: categoryId,
      });

      query.then((result) => {
        console.log({ result });
        setRefresh(true);
      });
    }
  }

  function removePick(toolId: string) {
    if (stack?.id) {
      const query = supabase
        .from("picks")
        .delete()
        .match({ stack_id: stack.id, tool_id: toolId });
      query.then(() => {
        setRefresh(true);
      });
    }
  }

  return isLoading ? (
    <Loading message="Loading my stack" />
  ) : stack ? (
    <MyStackProvider stack={stack} addPick={addPick} removePick={removePick}>
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
                  title={item.tool_name}
                  subTitle={item.category_name}
                  icon={
                    <ToolIcon svgXml={item.tool_icon} width="36" height="36" />
                  }
                />
              </SwipeableRow>
            );
          }}
        />
        <Slot />
      </YStack>
    </MyStackProvider>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}

export default withAuth(MyStack);
