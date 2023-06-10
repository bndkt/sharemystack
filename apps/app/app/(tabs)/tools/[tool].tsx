import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H2, Spinner, Text, XStack, YStack } from "tamagui";

import { ToolIcon } from "../../../components/icons/ToolIcon";
import { supabase } from "../../../lib/supabase";

export default function Index() {
  const { tool: slug } = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [tool, setTool] = useState<{
    id: string;
    name: string;
    slug: string;
    website: string;
    twitter?: string;
    color?: string;
    icon?: string;
  } | null>(null);

  const getTool = async () => {
    try {
      const { data } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website, twitter")
        .eq("slug", slug)
        .limit(1)
        .single();
      setTool(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTool();
  }, []);

  console.log({ tool });

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
