import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

export function ToolIcon({
  svgXml,
  color,
  width = "20",
  height = "20",
}: {
  svgXml?: string | null;
  color?: string | null;
  width?: string;
  height?: string;
}) {
  color ??= "$color";

  return svgXml ? (
    <SvgXml xml={svgXml} color={color} width={width} height={height} />
  ) : (
    <BoxSelect color="$gray5" width={width} height={height} />
  );
}
