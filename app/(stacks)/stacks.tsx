import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListItem, Spinner, YStack } from "tamagui";

import { supabase } from "../../lib/supabase";
import { Link, Stack } from "expo-router";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website?: string;
      twitter?: string;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data, error } = await supabase
        .from("stacks")
        .select("id, name, slug, website, twitter")
        .order("name");
      setStacks(data);
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
      <Stack.Screen options={{ headerShown: true, title: "Stacks" }} />
      <YStack fullscreen>
        <FlashList
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            return (
              <Link href={`/(stacks)/@${item.slug}`}>
                <ListItem title={item.name} subTitle={item.website} />
              </Link>
            );
          }}
          estimatedItemSize={stacks.length}
          data={stacks}
        />
      </YStack>
    </>
  );
}
