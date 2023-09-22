import { useMemo } from "react";
import { Token } from "tamagui";

import { TemplateProps } from ".";
import { Grid1 } from "./Grid1";

import { Pick } from "@/model/Pick";

export function Twitter1({
  picks,
  ...templateProps
}: TemplateProps & { picks: Pick[] }) {
  const iconGridProps = useMemo(() => {
    const maxIcons = 10;

    const iconSizes = new Map<number, Token>([
      [4, "$5"],
      [10, "$2"],
    ]);

    return {
      picks,
      maxIcons,
      iconSizes,
    };
  }, [picks]);

  return (
    <Grid1 {...templateProps} ratio={16 / 9} iconGridProps={iconGridProps} />
  );
}
