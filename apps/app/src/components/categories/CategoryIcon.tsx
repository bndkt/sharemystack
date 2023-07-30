import { Token } from "@tamagui/core";
import * as icons from "@tamagui/lucide-icons";

export function CategoryIcon({
  name,
  color,
  size,
}: {
  name?: string | null;
  color?: string | null;
  size?: Token;
}) {
  color ??= "$color";
  size ??= "$1.5";

  const iconNames = Object.keys(icons);
  if (!name || !iconNames.includes(name)) {
    name = "BoxSelect";
  }

  const Component = icons[name as keyof typeof icons];

  return <Component color={color} size={size} />;
}
