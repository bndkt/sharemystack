import { Link, Trash2, Twitter } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Button, H3, Text, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/components/providers/AuthProvider";
import { CreateStack } from "@/components/stacks/CreateStack";
import { PickList } from "@/components/stacks/PickList";
import { StackSheet } from "@/components/stacks/StackSheet";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";

function MyStack() {
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

  function removePick(stackId: string | null, toolId: string | null) {
    setLoading(true);
    const query = supabase
      .from("picks")
      .delete()
      .match({ stack_id: stackId, tool_id: toolId });
    query.then((result) => {
      // console.log({ result });
      setRefresh(true);
    });
  }

  return isLoading ? (
    <Loading />
  ) : stack ? (
    <YStack fullscreen>
      <YStack padding="$3">
        <H3>{stack.name ?? "Unnamed stack"}</H3>
        <XStack space="$2">
          {stack.website && <Button size="$3" onPress={() => {}} icon={Link} />}
          {stack.twitter && (
            <Button size="$3" onPress={() => {}} icon={Twitter} />
          )}
        </XStack>
      </YStack>
      <PickList
        picks={stack.picks_view}
        placeholder={
          <YStack padding="$3">
            <Text marginBottom="$3" textAlign="center">
              You have not added any tools to your stack yet.
            </Text>
          </YStack>
        }
        generateRightActions={(item) => [
          {
            text: <Trash2 color="white" />,
            color: "$red10",
            onPress: () => removePick(item.stack_id, item.tool_id),
          },
        ]}
      />
      <StackSheet stack={stack.id} refresh={() => setRefresh(true)} />
    </YStack>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}

export default withAuth(MyStack);
