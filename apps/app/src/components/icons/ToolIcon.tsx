import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

import { Tool } from "@/model/Tool";

export function ToolIcon({
  tool,
  width = "24",
  height = "24",
}: {
  tool: Tool;
  width?: string;
  height?: string;
}) {
  const color = tool.color.length > 0 ? tool.color : "black";

  return tool.icon ? (
    <SvgXml xml={tool.icon} color={color} width={width} height={height} />
  ) : (
    <BoxSelect color={color} width={width} height={height} />
  );
}
