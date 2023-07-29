import * as icons from "@tamagui/lucide-icons";

export function CategoryIcon({
  name,
  color,
}: {
  name?: string | null;
  color?: string | null;
}) {
  color ??= "$color";

  const iconNames = Object.keys(icons);
  if (!name || !iconNames.includes(name)) {
    name = "BoxSelect";
  }

  const Component = icons[name as keyof typeof icons];

  return <Component color={color} size="$1.5" />;
}
