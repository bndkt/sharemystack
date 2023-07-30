import { Token, getTokenValue, useTheme } from "@tamagui/core";
import { BoxSelect } from "@tamagui/lucide-icons";
import { SvgXml } from "react-native-svg";

import { Tool } from "@/model/Tool";

export function ToolIcon({ tool, size }: { tool: Tool; size?: Token }) {
  const theme = useTheme();

  const color = tool.color?.length ? tool.color : theme.color.val;
  size ??= "$1.5";

  const width = getTokenValue(size, "size");

  return tool.iconSvg ? (
    <SvgXml xml={tool.iconSvg} color={color} width={width} height={width} />
  ) : (
    <BoxSelect color={color} size={size} />
  );
}
