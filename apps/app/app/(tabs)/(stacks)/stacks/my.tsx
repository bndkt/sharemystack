import { useEffect, useState } from "react";
import { Button, H3, Spinner, Text, XStack, YStack } from "tamagui";

import { ToolList } from "../../../../components/stacks/ToolList";
import { StackResponse, getStack } from "../../../../lib/database/getStack";
import { withAuth } from "../../../../components/auth/withAuth";
import { useAuth } from "../../../../components/providers/AuthProvider";
import { CreateStack } from "../../../../components/stacks/CreateStack";
import { Link, Twitter } from "@tamagui/lucide-icons";
import { StackSheet } from "../../../../components/stacks/StackSheet";

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

  return isLoading ? (
    <Spinner />
  ) : stack ? (
    <YStack fullscreen>
      <YStack padding="$3">
        <H3>{stack.name}</H3>
        <XStack space="$2">
          {stack.website && <Button size="$3" onPress={() => {}} icon={Link} />}
          {stack.twitter && (
            <Button size="$3" onPress={() => {}} icon={Twitter} />
          )}
        </XStack>
      </YStack>
      <ToolList
        tools={stack.picks_view}
        placeholder={
          <YStack padding="$3">
            <Text marginBottom="$3" textAlign="center">
              You have not added any tools to your stack yet.
            </Text>
            <Button onPress={() => {}}>Add tools now</Button>
          </YStack>
        }
      />
      <StackSheet />
    </YStack>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}

export default withAuth(MyStack);
