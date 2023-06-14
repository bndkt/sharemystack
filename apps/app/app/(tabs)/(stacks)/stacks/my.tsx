import { useEffect, useState } from "react";
import { Button, H2, Spinner, Text, YStack } from "tamagui";

import { ToolList } from "../../../../components/stacks/ToolList";
import { StackResponse, getStack } from "../../../../lib/database/getStack";
import { withAuth } from "../../../../components/auth/withAuth";
import { useAuth } from "../../../../components/providers/AuthProvider";
import { CreateStack } from "../../../../components/stacks/CreateStack";

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
        <H2>{stack.name}</H2>
        <Text>{stack.website}</Text>
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
    </YStack>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}

export default withAuth(MyStack);
