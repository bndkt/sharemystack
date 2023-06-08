import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Spinner, YStack } from "tamagui";

import { supabase } from "../../lib/supabase";

export default function Categories() {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
      slug: string;
    }[]
  >([]);

  const getCategories = async () => {
    try {
      const { data } = await supabase
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
    getCategories();
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
                <ListItem
                  title={item.name}
                  subTitle={item.slug}
                  iconAfter={ChevronRight}
                />
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
