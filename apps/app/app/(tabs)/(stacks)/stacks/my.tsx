import { useEffect, useState } from "react";
import { Button, H2, Spinner, Text, YStack } from "tamagui";

import { ToolList } from "../../../../components/stacks/ToolList";
import { StackResponse, getStack } from "../../../../lib/database/getStack";
import { withAuth } from "../../../../components/auth/withAuth";
import { useAuth } from "../../../../components/providers/AuthProvider";
import { CreateStack } from "../../../../components/stacks/CreateStack";

function MyStack() {
  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const { user } = useAuth();

  function load() {
    if (user) {
      getStack({ user: user.id }).then(({ data }) => {
        setStack(data);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    load();
  }, [load]);

  return isLoading ? (
    <Spinner />
  ) : stack ? (
    <YStack fullscreen>
      <YStack padding="$3">
        <H2>{stack.name}</H2>
        <Text>{stack.website}</Text>
      </YStack>
      <ToolList
        data={stack.picks_view}
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
    <CreateStack refresh={load} />
  );
}

export default withAuth(MyStack);
