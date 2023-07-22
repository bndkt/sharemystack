import { Star } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Button, H3, Text, XStack, YStack } from "tamagui";

import { List } from "@/components/List";
import { PickItem } from "@/components/stacks/PickItem";
import { useAuth } from "@/hooks/useAuth";
import { useObservableStack } from "@/hooks/useObservableStack";
import { supabase } from "@/lib/supabase";
import { useRefresh } from "@/hooks/useRefresh";

export default function Index() {
  const { refresh } = useRefresh();
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.toLowerCase().substring(1);

  const { user, session } = useAuth();

  if (!slug) throw new Error("Stack not found");

  const { stack, picks } = useObservableStack({ slug, loadPicks: true });

  function addStar() {
    if (user && stack) {
      supabase
        .from("stars")
        .insert({
          stack_id: stack.id,
          user_id: user.id,
        })
        .then((result) => {
          console.log({ result });
          refresh();
        });
    }
  }

  function toggleStar() {
    if (user && stack) {
      const query = stack.starred
        ? supabase
            .from("stars")
            .update({
              deleted_at: "NOW()",
            })
            .match({ stack_id: stack.id, user_id: user.id, deleted_at: null })
        : supabase.from("stars").insert({
            stack_id: stack.id,
            user_id: user.id,
          });

      query.then((result) => {
        console.log({ result });
        refresh();
      });
    }
  }

  return stack ? (
    <>
      <Stack.Screen options={{ headerShown: true, title: stack.name ?? "" }} />
      <YStack fullscreen>
        <XStack padding="$3">
          <YStack flexGrow={1}>
            <H3>{stack.name}</H3>
            <Text>@{stack.slug}</Text>
          </YStack>
          {session && (
            <YStack justifyContent="center">
              <Button
                icon={
                  <Star
                    color="gray"
                    fill={stack.starred ? "gray" : "transparent"}
                    size="$1"
                  />
                }
                unstyled
                onPress={toggleStar}
              />
            </YStack>
          )}
        </XStack>
        <List
          data={picks}
          renderItem={({ item }) => <PickItem pick={item} />}
        />
      </YStack>
    </>
  ) : null;
}
