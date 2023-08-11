import { Rect, Svg, SvgXml } from "react-native-svg";

import { minidenticon } from "./minidenticon";

export function Identicon({ slug, width }: { slug: string; width: number }) {
  const identicon = minidenticon(slug);

  return <SvgXml xml={identicon} width={width} height={width} />;
}
