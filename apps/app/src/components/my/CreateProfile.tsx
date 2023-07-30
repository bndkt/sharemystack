import { Text, YStack } from "tamagui";

import { MyProfileForm } from "./MyProfileForm";

import { useAuth } from "@/hooks/useAuth";

export function CreateProfile() {
  const { user, createProfile } = useAuth();

  async function handleSubmit({ name, slug }: { name: string; slug: string }) {
    if (createProfile) {
      await createProfile({ name, slug });
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
        label="Create Profile"
        onSubmit={handleSubmit}
      />
    </YStack>
  );
}
