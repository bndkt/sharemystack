import {
  Facebook,
  Instagram,
  Linkedin,
  Share,
  Twitter,
} from "@tamagui/lucide-icons";
import { Button, XStack } from "tamagui";

import { Target } from "./templates";

export function TemplateSelector({
  target,
  active,
  onPress,
}: {
  target: Target;
  active: boolean;
  onPress: () => void;
}) {
  let icon = <Share size="$1.5" />;

  switch (target) {
    case "instagram":
      icon = <Instagram size="$1" />;
      break;
    case "facebook":
      icon = <Facebook size="$1" />;
      break;
    case "twitter":
      icon = <Twitter size="$1" />;
      break;
    case "linkedin":
      icon = <Linkedin size="$1" />;
      break;
  }

  return (
    <Button
      onPress={onPress}
      themeInverse
      backgroundColor={active ? "#ff7a00" : "$gray10"}
      icon={icon}
      marginLeft="$3"
      padding="$3"
    />
  );
}
