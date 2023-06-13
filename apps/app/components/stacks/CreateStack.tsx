import { Button, Text, YStack } from "tamagui";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "expo-router";

export function CreateStack({ getStack }: { getStack: () => void }) {
  const { user } = useAuth();
  const { push } = useRouter();

  async function createStack() {
    if (user) {
      const { data, error } = await supabase.from("stacks").insert({
        name: user.user_metadata.full_name,
        slug: (user.user_metadata.preferred_username as string).toLowerCase(),
        twitter: user.user_metadata.preferred_username.preferred_username,
        user_id: user.id,
      });
      getStack();
      console.log({ data, error });
      console.log("createStack", user.user_metadata);
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
