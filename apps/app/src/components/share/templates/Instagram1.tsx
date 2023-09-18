import { useMemo } from "react";
import { Token } from "tamagui";

import { TemplateProps } from ".";
import { Grid1 } from "./Grid1";

import { Pick } from "@/model/Pick";

export function Instagram1({
  picks,
  ...templateProps
}: TemplateProps & { picks: Pick[] }) {
  const iconGridProps = useMemo(() => {
    console.log("iconGridProps");
    const maxIcons = 20;

    const iconSizes = new Map<number, Token>([
      [3, "$8"],
      [10, "$3"],
    ]);

    return {
      picks,
      maxIcons,
      iconSizes,
    };
  }, [picks]);

  return <Grid1 {...templateProps} ratio={1} iconGridProps={iconGridProps} />;
}
