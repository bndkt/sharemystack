import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H3, Spinner, Text, YStack } from "tamagui";

import { ToolList } from "../../../components/stacks/ToolList";
import { StackResponse, getStack } from "../../../lib/database/getStack";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.substring(1);

  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] = useState<StackResponse["data"]>(null);

  useEffect(() => {
    if (slug && !stack) {
      getStack({ slug }).then(({ data }) => {
        setStack(data);
        setLoading(false);
      });
    }
  }, [slug, stack]);

  return isLoading ? (
    <Spinner />
  ) : stack ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: stack.name ?? "" }} />
      <YStack fullscreen>
        <YStack padding="$3">
          <H3>{stack.name}</H3>
          <Text>{stack.website}</Text>
        </YStack>
        <ToolList tools={stack.picks_view} />
      </YStack>
    </>
  ) : null;
}
