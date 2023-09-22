import { Text, YStack } from "tamagui";

import { MyProfileForm } from "./MyProfileForm";

import { useProfile } from "@/hooks/data/useProfile";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";

export function CreateProfile() {
  const { user } = useAuth();
  const { createProfile } = useProfile({ user });
  const { queueSync } = useSync();
  const { addTag, addTrigger } = useAnalytics();

  async function handleSubmit({ name, slug }: { name: string; slug: string }) {
    if (createProfile) {
      await createProfile({ name, slug });
      queueSync();
      addTag("profile_created", "now()");
      addTrigger("profile_created", "true");
    }
  }

  return (
    <YStack padding="$3">
      <Text marginBottom="$3" textAlign="center">
        You haven’t created your profile. Let’s do that now.
      </Text>
      <MyProfileForm
        initialName={user?.user_metadata?.full_name}
        initialSlug={user?.user_metadata?.preferred_username}
        onSubmit={handleSubmit}
      />
    </YStack>
  );
}
