import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

import { Tool } from "@/model/Tool";

export function ToolIcon({ tool, size = 24 }: { tool: Tool; size?: number }) {
  const color = tool.color.length > 0 ? tool.color : "black";

  return tool.icon ? (
    <SvgXml xml={tool.icon} color={color} width={size} height={size} />
  ) : (
    <BoxSelect color={color} width={size} height={size} />
  );
}
