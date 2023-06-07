import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import { supabase } from "../../lib/supabase";
import { H2, Spinner, Text, XStack } from "tamagui";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();

  slug = slug.substring(1);

  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] = useState<{
    id: string;
    name: string;
    slug: string;
    website?: string;
  } | null>(null);

  const getStack = async () => {
    try {
      const { data, error } = await supabase
        .from("stacks")
        .select("id, name, slug, website")
        .eq("slug", slug)
        .limit(1)
        .single();
      setStack(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStack();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: `${stack.name}'s stack` }}
      />
      <XStack>
        <H2>{stack.name}</H2>
        <Text>{stack.website}</Text>
      </XStack>
    </>
  );
}
