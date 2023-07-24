import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { H2, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { Tool } from "@/model/Tool";

export default function Index() {
  const { tool: slug } = useLocalSearchParams<{ tool: string }>();
  const [isLoading, setLoading] = useState(true);
  const [tool, setTool] = useState<Tool>();

  /* useEffect(() => {
    slug &&
      getTool({ slug }).then(({ data }) => {
        setTool(data);
        setLoading(false);
      });
  }, [getTool, setTool]); */

  // Color
  // Icon
  // Users
  // Category
  return isLoading ? (
    <Loading />
  ) : tool ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: tool.name }} />
      <XStack alignItems="center" padding="$3">
        <ToolIcon tool={tool} />
        <YStack marginLeft="$3">
          <H2>{tool.name}</H2>
        </YStack>
      </XStack>
    </>
  ) : null;
}
