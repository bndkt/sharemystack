import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { SvgXml } from "react-native-svg";

import { supabase } from "../../lib/supabase";
import { H2, Spinner, XStack } from "tamagui";

export default function Index() {
  const { tool: slug } = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [tool, setTool] = useState<{
    id: string;
    name: string;
    slug: string;
    website: string;
    color?: string;
    icon?: string;
  } | null>(null);

  const getTool = async () => {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website")
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
  ) : (
    <>
      <Stack.Screen options={{ headerShown: true, title: tool.name }} />
      <XStack>
        <H2 style={{ color: tool.color ?? "#000000" }}>{tool.name}</H2>
        <Text>{tool.website}</Text>
        {tool.icon && (
          <XStack
            style={{
              backgroundColor: tool.color.length > 0 ? tool.color : "#000000",
            }}
          >
            <SvgXml xml={tool.icon} width="100%" height="100%" />
          </XStack>
        )}
      </XStack>
    </>
  );
}
