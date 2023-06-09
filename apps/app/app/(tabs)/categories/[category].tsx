import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H2, Spinner, Text, XStack } from "tamagui";

import { Database } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";

export default function Category() {
  const { category: slug } = useLocalSearchParams<{ category: string }>();
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] =
    useState<Database["public"]["Tables"]["categories"]["Row"]>();

  const getCategory = async () => {
    try {
      const { data: category } = await supabase
        .from("categories")
        .select("id, created_at, name, slug")
        .eq("slug", slug)
        .limit(1)
        .single();
      setCategory(category);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: `${category.name}` }}
      />
      <XStack>
        <H2>{category.name}</H2>
        <Text>{category.slug}</Text>
      </XStack>
    </>
  );
}
