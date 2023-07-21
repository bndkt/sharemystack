import { Star } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, H3, Text, XStack, YStack } from "tamagui";
import { customEvent } from "vexo-analytics";

import { List } from "@/components/List";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useObservableStack } from "@/hooks/useObservableStack";
import { PickItem } from "@/components/stacks/PickItem";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.toLowerCase().substring(1);

  const [isStarred, setIsStarred] = useState(false);

  const { user, session } = useAuth();

  if (!slug) throw new Error("Stack not found");

  const { stack, picks } = useObservableStack({ slug, loadPicks: true });

  function toggleStar() {
    setIsStarred(!isStarred);

    if (!isStarred) {
      customEvent("starred", {
        stack: stack?.id,
      });
    }

    if (user?.id && stack?.id) {
      const query = !isStarred
        ? supabase
            .from("stars")
            .upsert({
              stack_id: stack.id,
              user_id: user?.id,
            })
            .select()
        : supabase.from("stars").delete().match({
            stack_id: stack.id,
            user_id: user?.id,
          });

      query.then((result) => {
        console.log({ result });
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
                    fill={isStarred ? "gray" : "transparent"}
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
