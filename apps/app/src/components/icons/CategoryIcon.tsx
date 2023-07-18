import * as icons from "@tamagui/lucide-icons";

export function CategoryIcon({
  name,
  color,
  width = "24",
  height = "24",
}: {
  name?: string | null;
  color?: string | null;
  width?: string;
  height?: string;
}) {
  color ??= "$color";

  const iconNames = Object.keys(icons);
  if (!name || !iconNames.includes(name)) {
    name = "BoxSelect";
  }

  const Component = icons[name as keyof typeof icons];

  return <Component color={color} width={width} height={height} />;
}
