import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { H2, ListItem, Separator, Spinner, Text, YStack } from "tamagui";

import { ToolIcon } from "../../../components/icons/ToolIcon";
import { supabase } from "../../../lib/supabase";
import { ToolList } from "../../../components/stacks/ToolList";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.substring(1);

  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] = useState<{
    id: string;
    created_at: string;
    name: string;
    slug: string;
    website: string | null;
    twitter: string | null;
    picks_view: {
      category_name: string | null;
      category_slug: string | null;
      tool_name: string | null;
      tool_slug: string | null;
      tool_icon: string | null;
      tool_color: string | null;
    }[];
  }>();

  const getStack = async () => {
    try {
      const { data: stacks, error } = await supabase
        .from("stacks")
        .select(
          "id, created_at, name, slug, website, twitter, picks_view (category_name, category_slug, tool_name, tool_slug, tool_icon, tool_color)"
        )
        .eq("slug", slug)
        .limit(1);
      error && console.error(error);
      stacks && setStack(stacks[0]);
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
  ) : stack ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: stack.name }} />
      <YStack fullscreen>
        <YStack padding="$3">
          <H2>{stack.name}</H2>
          <Text>{stack.website}</Text>
        </YStack>
        <ToolList data={stack.picks_view} />
      </YStack>
    </>
  ) : null;
}
