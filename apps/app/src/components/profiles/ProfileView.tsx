import { Globe, Twitter, Youtube } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { Button, Text, Unspaced, XStack, YStack } from "tamagui";

import { ProfileActions } from "./ProfileActions";

import { config } from "@/lib/config";
import { Profile as ProfileModel } from "@/model/Profile";
import { Stack as StackModel } from "@/model/Stack";

export function ProfileView({
  profile,
  stacks,
}: {
  profile: ProfileModel;
  stacks?: StackModel[] | null;
}) {
  const imageUrl = profile.image
    ? `${config.supabaseUrl}/storage/v1/object/public/public-images/profiles/${profile.image}`
    : undefined;

  return (
    <YStack>
      <YStack
        paddingBottom="$3"
        borderBottomColor="$borderColor"
        borderBottomWidth="$1"
        gap="$3"
      >
        {/* <YStack paddingHorizontal="$3">
          <H3>{profile.name}</H3>
          <H4>@{profile.slug}</H4>
        </YStack> */}
        {imageUrl && (
          <Unspaced>
            <Image
              // style={styles.image}
              source={imageUrl}
              placeholder={profile.blurhash}
              contentFit="cover"
              style={{ width: "100%", height: 200 }}
            />
          </Unspaced>
        )}
        <XStack paddingHorizontal="$3" marginTop="$3">
          <XStack flexGrow={1} gap="$3">
            {profile.website && (
              <Button
                onPress={() => Linking.openURL(profile.website)}
                icon={<Globe size="$1.5" />}
                unstyled
              />
            )}
            {profile.twitter && (
              <Button
                onPress={() =>
                  Linking.openURL(`https://twitter.com/${profile.twitter}`)
                }
                icon={<Twitter size="$1.5" color="#1DA1F2" />}
                unstyled
              />
            )}
            {profile.youtube && (
              <Button
                onPress={() =>
                  Linking.openURL(`https://youtube.com/${profile.youtube}`)
                }
                icon={<Youtube size="$1.5" color="#FF0000" />}
                unstyled
              />
            )}
          </XStack>
          <ProfileActions profile={profile} />
        </XStack>

        {profile.description && (
          <Text paddingHorizontal="$3" fontSize="$5">
            {profile.description}
          </Text>
        )}
      </YStack>
    </YStack>
  );
}
