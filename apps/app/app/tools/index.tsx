import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Separator, Spinner, YStack } from "tamagui";

import { supabase } from "../../lib/supabase";
import { ToolIcon } from "../../components/ToolIcon";
import { SuggestionButton } from "../../components/SuggestionButton";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website: string | null;
      color?: string | null;
      icon?: string | null;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website")
        .order("name");
      data && setTools(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTools();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Tools" }} />
      <YStack fullscreen>
        <FlashList
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => {
            return (
              <Link href={`/tools/${item.slug}`}>
                <ListItem
                  icon={
                    <ToolIcon
                      svgXml={item.icon}
                      color={item.color}
                      width="24"
                      height="24"
                    />
                  }
                  title={item.name}
                  subTitle={item.website}
                  iconAfter={ChevronRight}
                />
              </Link>
            );
          }}
          estimatedItemSize={tools.length}
          data={tools}
        />
        <SuggestionButton />
      </YStack>
    </>
  );
}
