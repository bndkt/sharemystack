import { List } from "../List";
import { ToolIcon } from "../icons/ToolIcon";

type PickList = {
  category_name: string | null;
  category_slug: string | null;
  tool_name: string | null;
  tool_slug: string | null;
  tool_icon: string | null;
  tool_color: string | null;
}[];

export function PickList({
  picks,
  placeholder,
}: {
  picks: PickList;
  placeholder?: JSX.Element;
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
    />
  );
}
