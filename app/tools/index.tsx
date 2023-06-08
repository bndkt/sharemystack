import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListItem, Spinner, YStack } from "tamagui";
import { ChevronRight, Wrench } from "@tamagui/lucide-icons";

import { supabase } from "../../lib/supabase";
import { Link, Stack } from "expo-router";
import { SvgXml } from "react-native-svg";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website: string;
      color?: string;
      icon?: string;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website")
        .order("name");
      setTools(data);
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
          renderItem={({ item }) => {
            return (
              <Link href={`/tools/${item.slug}`}>
                <ListItem
                  icon={
                    item.icon ? (
                      <SvgXml
                        xml={item.icon}
                        width="20"
                        height="20"
                        color={item.color ?? "#000000"}
                      />
                    ) : (
                      <Wrench
                        color={item.color ?? "#000000"}
                        width="20"
                        height="20"
                      />
                    )
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
      </YStack>
    </>
  );
}
