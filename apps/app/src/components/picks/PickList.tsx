import { ListItem } from "tamagui";

import { GenerateRightActions, List } from "../List";
import { ToolIcon } from "../icons/ToolIcon";

import { StackResponse } from "@/lib/database/getStack";

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
      /* href={(item) => `/(stacks)/@${item.category_slug}`}
       title={(item) => item.tool_name}
      subTitle={(item) => item.category_name}
      icon={(item) => (
        <ToolIcon
          svgXml={item.tool_icon}
          // color={item.tool_color}
          width="36"
          height="36"
        />
      )}
      placeholder={placeholder}
      generateRightActions={generateRightActions} */
      renderItem={({ item }) => {
        return (
          <ListItem
            title={item.tool_name}
            subTitle={item.category_name}
            icon={<ToolIcon svgXml={item.tool_icon} width="36" height="36" />}
          />
        );
      }}
    />
  );
}
