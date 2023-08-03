import { Share as ShareIcon, Star } from "@tamagui/lucide-icons";
import { Share } from "react-native";
import { Button, XStack } from "tamagui";

import { config } from "@/lib/config";
import { Profile } from "@/model/Profile";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function ProfileActions({ profile }: { profile: Profile }) {
  const { user } = useAuth();
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    profile.isStarred.subscribe((stars) => {
      setIsStarred(stars > 0);
    });
  }, [profile]);

  function toggleStar() {
    if (isStarred) {
      profile.removeStar();
    } else {
      user && profile.addStar(user.id);
    }
  }

  return (
    <XStack space="$3">
      {user && (
        <Button
          icon={<Star fill={isStarred ? "black" : "transparent"} size="$1.5" />}
          unstyled
          onPress={toggleStar}
        />
      )}
      <Button
        icon={<ShareIcon size="$1.5" />}
        unstyled
        justifyContent="center"
        onPress={async () => {
          await Share.share({
            url: `${config.domain}/@${profile.slug}`,
          });
        }}
      />
    </XStack>
  );
}
