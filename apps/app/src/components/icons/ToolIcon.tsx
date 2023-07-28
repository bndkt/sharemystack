import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

import { Tool } from "@/model/Tool";
import { SizeTokens, Token, getTokenValue } from "tamagui";

export function ToolIcon({ tool, size = "$1.5" }: { tool: Tool; size: Token }) {
  const color = tool.color.length > 0 ? tool.color : "black";

  const width = getTokenValue(size, "size");

  return tool.icon ? (
    <SvgXml xml={tool.icon} color={color} width={width} height={width} />
  ) : (
    <BoxSelect color={color} size={size} />
  );
}
