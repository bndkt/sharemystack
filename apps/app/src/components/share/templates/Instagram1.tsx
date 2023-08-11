import { TemplateProps } from ".";
import { Grid1 } from "./Grid1";

export function Instagram1(templateProps: TemplateProps) {
  return (
    <Grid1
      {...templateProps}
      ratio={1}
      maxIcons={20}
      iconSizes={
        new Map([
          [3, "$8"],
          [10, "$5"],
          [20, "$3"],
        ])
      }
    />
  );
}
