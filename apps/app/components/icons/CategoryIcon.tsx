import * as icons from "@tamagui/lucide-icons";

export function CategoryIcon({
  name,
  color,
  width = "16",
  height = "16",
}: {
  name?: string | null;
  color?: string | null;
  width?: string;
  height?: string;
}) {
  color ??= "#000000";

  const iconNames = Object.keys(icons);
  if (!name || !iconNames.includes(name)) {
    name = "BoxSelect";
  }

  const Component = icons[name as keyof typeof icons];

  return <Component color={color} width={width} height={height} />;
}
