import { FileEdit, Share as ShareIcon } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Share } from "react-native";
import { Button, H3, H4, XStack, YStack } from "tamagui";

import { MyProfileForm } from "./MyProfileForm";

import { config } from "@/lib/config";
import { Profile } from "@/model/Profile";

export function MyProfileHeader({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  async function handleSubmit({ name, slug }: { name: string; slug: string }) {
    profile.updateProfile({ name, slug });
    setIsEditing(false);
  }

  async function handleShare() {
    // router.push("/(tabs)/my/share");
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
      <XStack padding="$3" gap="$3">
        <Button icon={<FileEdit size="$1.5" />} unstyled onPress={handleEdit} />
        <Button
          icon={<ShareIcon size="$1.5" />}
          unstyled
          onPress={handleShare}
        />
      </XStack>
    </XStack>
  );
}
