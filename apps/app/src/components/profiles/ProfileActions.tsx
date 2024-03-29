import { Share as ShareIcon, Star } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { Button, XStack, useTheme } from "tamagui";

import { useAuth } from "@/hooks/useAuth";
import { config } from "@/lib/config";
import { Profile } from "@/model/Profile";

export function ProfileActions({ profile }: { profile: Profile }) {
  const { user } = useAuth();
  const [isStarred, setIsStarred] = useState(false);
  const theme = useTheme();

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
    <XStack gap="$3">
      {user && (
        <Button
          icon={
            <Star
              fill={isStarred ? theme.color.val : "transparent"}
              size="$1.5"
            />
          }
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
