import { Avatar } from "tamagui";

import { Identicon } from "./Identicon";

import { Profile } from "@/model/Profile";

export function ProfileIcon({ profile }: { profile: Profile }) {
  return (
    <Avatar circular size="$3" backgroundColor="$color">
      {profile.twitterImageUrl ? (
        <Avatar.Image source={{ uri: profile.twitterImageUrl }} />
      ) : (
        <Identicon slug={profile.slug} width={30} />
      )}
      {/* <Avatar.Fallback backgroundColor="$sms" delayMs={1000} /> */}
    </Avatar>
  );
}
