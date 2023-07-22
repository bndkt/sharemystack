import { Check, Plus } from "@tamagui/lucide-icons";
import { useMemo } from "react";
import { ListItem } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { useMyStack } from "@/hooks/useMyStack";
import { Category } from "@/model/Category";
import { Tool } from "@/model/Tool";

export function PickTool({
  category,
  item,
}: {
  category: Category;
  item: Tool;
}) {
  const { picks, addPick, removePick } = useMyStack();

  const pickId = useMemo(() => {
    return picks?.find((pick) => pick.tool.id === item.id)?.id;
  }, [picks, item.id]);

  return (
    <ListItem
      title={item.name}
      icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
      iconAfter={pickId ? <Check color="gray" size="$1" /> : <Plus size="$1" />}
      onPress={() =>
        pickId ? removePick(pickId) : addPick(item.id, category.id)
      }
    />
  );
}
