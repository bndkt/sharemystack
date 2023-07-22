import { Check, Plus } from "@tamagui/lucide-icons";
import { useMemo } from "react";
import { ListItem } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { useMyStack } from "@/hooks/useMyStack";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";
import { useRefresh } from "@/hooks/useRefresh";

export function PickTool({
  category,
  item,
}: {
  category: Category;
  item: Tool;
}) {
  const { stack, picks, addPick, removePick } = useMyStack();
  const { refresh } = useRefresh();

  const pick = useMemo(() => {
    return picks?.find((pick) => pick.tool.id === item.id);
  }, [picks, item.id]);

  function add(tool: Tool, category: Category) {
    // addPick(item.id, category.id);
    stack?.addPick(tool, category);
    refresh();
  }

  function remove(pick: Pick) {
    // removePick(pick.id);
    stack?.removePick(pick);
    refresh();
  }

  return (
    <ListItem
      title={item.name}
      icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
      iconAfter={pick ? <Check color="gray" size="$1" /> : <Plus size="$1" />}
      onPress={() => (pick ? remove(pick) : add(item, category))}
    />
  );
}
