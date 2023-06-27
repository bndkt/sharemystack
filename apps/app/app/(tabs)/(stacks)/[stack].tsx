import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H3, Text, YStack } from "tamagui";

import { PickList } from "@/components/stacks/PickList";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { Loading } from "@/components/Loading";

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
    <Loading />
  ) : stack ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: stack.name ?? "" }} />
      <YStack fullscreen>
        <YStack padding="$3">
          <H3>{stack.name}</H3>
          <Text>{stack.website}</Text>
        </YStack>
        <PickList picks={stack.picks_view} />
      </YStack>
    </>
  ) : null;
}
