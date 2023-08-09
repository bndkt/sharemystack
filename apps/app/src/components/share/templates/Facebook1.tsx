import { TemplateProps } from ".";

import { Grid1 } from "./Grid1";

export function Facebook1(templateProps: TemplateProps) {
  return (
    <Grid1
      {...templateProps}
      ratio={1.91}
      maxIcons={10}
      iconSizes={
        new Map([
          [3, "$8"],
          [10, "$3"],
        ])
      }
    />
  );
}
