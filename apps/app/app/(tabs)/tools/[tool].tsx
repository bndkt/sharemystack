import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H2, Spinner, Text, XStack, YStack } from "tamagui";

import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolResponse, getTool } from "@/lib/database/getTool";

export default function Index() {
  const { tool: slug } = useLocalSearchParams<{ tool: string }>();
  const [isLoading, setLoading] = useState(true);
  const [tool, setTool] = useState<ToolResponse["data"]>(null);

  useEffect(() => {
    slug &&
      getTool({ slug }).then(({ data }) => {
        setTool(data);
        setLoading(false);
      });
  }, [getTool, setTool]);

  // Color
  // Icon
  // Users
  // Category
  return isLoading ? (
    <Spinner />
  ) : tool ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: tool.name }} />
      <XStack alignItems="center" padding="$3">
        <ToolIcon
          svgXml={tool.icon}
          color={tool.color}
          width="24"
          height="24"
        />
        <YStack marginLeft="$3">
          <H2>{tool.name}</H2>
          <Text>Website: {tool.website}</Text>
          <Text>Twitter: {tool.twitter}</Text>
        </YStack>
      </XStack>
    </>
  ) : null;
}
