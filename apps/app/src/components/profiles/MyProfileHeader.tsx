import { H3, H4, YStack } from "tamagui";

import { Profile } from "@/model/Profile";

export function MyProfileHeader({ profile }: { profile: Profile }) {
  async function handleSubmit({ name, slug }: { name: string; slug: string }) {
    console.log("submit", { name, slug });
  }

  return (
    <YStack padding="$3">
      <H3>{profile.name}</H3>
      <H4>@{profile.slug}</H4>
    </YStack>
  );
}
