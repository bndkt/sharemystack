import { Button, H3, H4, XStack, YStack } from "tamagui";

import { Profile } from "@/model/Profile";
import { Edit, Share as ShareIcon } from "@tamagui/lucide-icons";
import { useState } from "react";
import { MyProfileForm } from "./MyProfileForm";
import { Share } from "react-native";
import { config } from "@/lib/config";

export function MyProfileHeader({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEdit() {
    console.log("Edit");
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  async function handleSubmit({ name, slug }: { name: string; slug: string }) {
    console.log("submit", { name, slug });
    profile.updateProfile({ name, slug });
    setIsEditing(false);
  }

  async function handleShare() {
    await Share.share({
      url: `${config.domain}/@${profile.slug}`,
    });
  }

  return isEditing ? (
    <YStack padding="$3">
      <MyProfileForm
        initialName={profile.name}
        initialSlug={profile.slug}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        update={true}
      />
    </YStack>
  ) : (
    <XStack alignItems="center">
      <YStack flexGrow={1} padding="$3">
        <H3>{profile.name}</H3>
        <H4>@{profile.slug}</H4>
      </YStack>
      <XStack padding="$3" space="$3">
        <Button icon={<Edit size="$1.5" />} unstyled onPress={handleEdit} />
        <Button
          icon={<ShareIcon size="$1.5" />}
          unstyled
          onPress={handleShare}
        />
      </XStack>
    </XStack>
  );
}
