import { Button, Text, YStack } from "tamagui";

import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

export function CreateStack({ refresh }: { refresh: () => void }) {
  const { user } = useAuth();

  async function createStack() {
    if (user) {
      const { data, error } = await supabase.from("stacks").insert({
        name: user.user_metadata.full_name,
        slug: user.user_metadata.preferred_username
          ? "@"
              .concat(user.user_metadata.preferred_username as string)
              .toLowerCase()
          : user.id,
        twitter: user.user_metadata.preferred_username,
        twitter_image_url: user.user_metadata.avatar_url,
        user_id: user.id,
      });
      refresh();
      console.log({ data, error });
      console.log("createStack", data, error);
    }
  }

  return (
    <YStack padding="$3">
      <Text marginBottom="$3" textAlign="center">
        You have not yet created your stack!
      </Text>
      <Button onPress={createStack}>Create my stack</Button>
    </YStack>
  );
}
