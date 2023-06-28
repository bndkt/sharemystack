import { StackResponse } from "@/lib/database/getStack";
import { GenerateRightActions, List } from "../List";
import { ToolIcon } from "../icons/ToolIcon";

export function PickList({
  picks,
  placeholder,
  generateRightActions,
}: {
  picks: NonNullable<StackResponse["data"]>["picks_view"];
  placeholder?: JSX.Element;
  generateRightActions?: GenerateRightActions<
    NonNullable<StackResponse["data"]>["picks_view"][number]
  >;
}) {
  return (
    <List
      data={picks}
      // href={(item) => `/(stacks)/@${item.category_slug}`}
      title={(item) => item.tool_name}
      subTitle={(item) => item.category_name}
      icon={(item) => (
        <ToolIcon
          svgXml={item.tool_icon}
          color={item.tool_color}
          width="36"
          height="36"
        />
      )}
      placeholder={placeholder}
      generateRightActions={generateRightActions}
    />
  );
}
