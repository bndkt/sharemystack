import { Avatar } from "tamagui";

import { Profile } from "@/model/Profile";

export function ProfileIcon({ profile }: { profile: Profile }) {
  return (
    <Avatar circular size="$3">
      {profile.twitterImageUrl && (
        <Avatar.Image
          source={{ uri: profile.twitterImageUrl, width: 400, height: 400 }}
        />
      )}
      <Avatar.Fallback backgroundColor="$sms" delayMs={1000} />
    </Avatar>
  );
}
