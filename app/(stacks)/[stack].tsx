import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H2, Spinner, Text, XStack } from "tamagui";

import { Database } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();

  slug = slug?.substring(1);

  console.log({ slug });

  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] =
    useState<Database["public"]["Tables"]["stacks"]["Row"]>();
  const [picks, setPicks] =
    useState<Database["public"]["Tables"]["tools"]["Row"]>();

  const getStack = async () => {
    try {
      const { data: stack } = await supabase
        .from("stacks")
        .select("id, created_at, name, slug, website, twitter")
        .eq("slug", slug)
        .limit(1)
        .single();
      stack && setStack(stack);

      const { data: picks } = await supabase
        .from("picks")
        .select("tools (id, name, slug, website)")
        .eq("slug", slug)
        .limit(1)
        .single();
      console.log({ picks });
      picks && setPicks(picks);
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
  ) : stack && picks ? (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: `${stack.name}'s stack` }}
      />
      <XStack>
        <H2>{stack.name}</H2>
        <Text>{stack.website}</Text>
      </XStack>
    </>
  ) : null;
}
