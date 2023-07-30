import { Token, getTokenValue, useTheme } from "@tamagui/core";
import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

import { Tool } from "@/model/Tool";

export function ToolIcon({ tool, size = "$1.5" }: { tool: Tool; size: Token }) {
  const theme = useTheme();

  const color = tool.color?.length ? tool.color : theme.color.val;

  const width = getTokenValue(size, "size");

  return tool.icon ? (
    <SvgXml xml={tool.icon} color={color} width={width} height={width} />
  ) : (
    <BoxSelect color={color} size={size} />
  );
}
