import { Image } from "expo-image";
import { Avatar } from "tamagui";

import { Identicon } from "./Identicon";

import { config } from "@/lib/config";
import { Profile } from "@/model/Profile";

export function ProfileIcon({ profile }: { profile: Profile }) {
  const avatarImage = profile.avatarImage
    ? `${config.supabaseUrl}/storage/v1/object/public/public-images/avatars/${profile.avatarImage}?width=100`
    : undefined;

  return (
    <Avatar circular size="$3" backgroundColor="$color">
      {profile.avatarImage ? (
        <Image
          source={avatarImage}
          placeholder={profile.avatarBlurhash}
          contentFit="cover"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Identicon slug={profile.slug} width={30} />
      )}
    </Avatar>
  );
}
