import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  H2,
  ListItem,
  Separator,
  Spinner,
  Text,
  YStack,
} from "tamagui";

import { ToolIcon } from "../../components/icons/ToolIcon";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { CreateStack } from "./CreateStack";
import { ToolList } from "./ToolList";

export default function MyStack() {
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
  const { user } = useAuth();

  const getStack = async () => {
    try {
      const { data, error } = await supabase
        .from("stacks")
        .select(
          "id, created_at, name, slug, website, twitter, picks_view (category_name, category_slug, tool_name, tool_slug, tool_icon, tool_color)"
        )
        .eq("user_id", user?.id)
        .limit(1)
        .maybeSingle();
      error && console.error(error);
      data && setStack(data);
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
      <YStack fullscreen>
        <YStack padding="$3">
          <H2>{stack.name}</H2>
          <Text>{stack.website}</Text>
        </YStack>
        <ToolList
          data={stack.picks_view}
          placeholder={
            <YStack padding="$3">
              <Text marginBottom="$3" textAlign="center">
                You have not added any tools to your stack yet.
              </Text>
              <Button onPress={() => {}}>Add tools now</Button>
            </YStack>
          }
        />
        {stack.picks_view.length > 0 ? (
          <FlashList
            // onRefresh={() => getStack()}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({ item }) => {
              return (
                <Link href={`/(stacks)/@${item.category_slug}`}>
                  <ListItem
                    title={item.tool_name}
                    subTitle={item.category_name}
                    iconAfter={ChevronRight}
                    icon={
                      <ToolIcon
                        svgXml={item.tool_icon}
                        color={item.tool_color}
                        width="24"
                        height="24"
                      />
                    }
                  />
                </Link>
              );
            }}
            estimatedItemSize={stack.picks_view.length}
            data={stack.picks_view}
          />
        ) : (
          <YStack padding="$3">
            <Text marginBottom="$3" textAlign="center">
              You have not added any tools to your stack yet.
            </Text>
            <Button onPress={() => {}}>Add tools now</Button>
          </YStack>
        )}
      </YStack>
    </>
  ) : (
    <CreateStack getStack={getStack} />
  );
}
