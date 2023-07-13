import { Star } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, H3, Text, XStack, YStack } from "tamagui";
import { customEvent } from "vexo-analytics";

import { Loading } from "@/components/Loading";
import { useAuth } from "@/components/providers/AuthProvider";
import { PickList } from "@/components/stacks/PickList";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const { stack: slug } = useLocalSearchParams<{ stack: string }>();

  const [isLoading, setLoading] = useState(true);
  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const [isStarred, setIsStarred] = useState(false);

  const { user, session } = useAuth();

  useEffect(() => {
    if (slug && !stack) {
      getStack({ slug }).then(({ data }) => {
        setStack(data);
        setIsStarred(data?.starred ?? false);
        setLoading(false);
      });
    }
  }, [slug, stack]);

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

  return isLoading ? (
    <Loading />
  ) : stack ? (
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
        <PickList picks={stack.picks_view} />
      </YStack>
    </>
  ) : null;
}
