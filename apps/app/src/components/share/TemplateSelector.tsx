import { Facebook, Instagram, Linkedin, Twitter } from "@tamagui/lucide-icons";
import { Button, styled } from "tamagui";

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
  let Icon = Instagram;

  switch (target) {
    case "instagram":
      Icon = Instagram;
      break;
    case "facebook":
      Icon = Facebook;
      break;
    case "twitter":
      Icon = Twitter;
      break;
    case "linkedin":
      Icon = Linkedin;
      break;
  }

  const TemplateButton = styled(Button, {
    marginLeft: "$1.5",
    marginRight: "$1.5",
    paddingTop: "$3",
    paddingBottom: "$2",
    variants: {
      active: {
        true: {
          backgroundColor: "$sms",
        },
        false: {
          backgroundColor: "$borderColor",
        },
      },
    },
  });

  return (
    <TemplateButton
      onPress={onPress}
      active={active}
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      icon={<Icon size="$1" color={active ? "$background" : "$gray10"} />}
    />
  );
}
