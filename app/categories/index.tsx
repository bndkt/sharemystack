import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListItem, Spinner, YStack } from "tamagui";
import { Wrench } from "@tamagui/lucide-icons";

import { supabase } from "../../lib/supabase";
import { Link, Stack } from "expo-router";
import { SvgXml } from "react-native-svg";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
      slug: string;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug")
        .order("name");
      setCategories(data);
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
              <Link href={`/categories/${item.slug}`}>
                <ListItem title={item.name} subTitle={item.slug} />
              </Link>
            );
          }}
          estimatedItemSize={categories.length}
          data={categories}
        />
      </YStack>
    </>
  );
}
