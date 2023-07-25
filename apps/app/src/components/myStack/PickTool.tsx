import { Check, Plus } from "@tamagui/lucide-icons";
import { ListItem } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export function PickTool({
  category,
  item,
}: {
  category: Category;
  item: Tool;
}) {
  const { stack, picks } = useAuth();
  const { capture } = useAnalytics();
  const { sync } = useSync();

  const pick = picks?.find(
    (pick) => pick.tool.id === item.id && pick.category.id === category.id
  );

  function add(tool: Tool, category: Category) {
    stack?.addPick(tool, category);
    // TODO: (Workaround) Sync manually, because otherwise an immediate deletion after adding would not work
    sync();
    capture("Add pick", {
      tool: tool.slug,
      category: category.slug,
      stack: stack?.id,
    });
  }

  function remove(pick: Pick) {
    stack?.removePick(pick);
    capture("Remove pick");
  }

  return (
    <ListItem
      title={item.name}
      icon={<ToolIcon tool={item} width="24" height="24" />}
      iconAfter={pick ? <Check color="gray" size="$1" /> : <Plus size="$1" />}
      onPress={() => (pick ? remove(pick) : add(item, category))}
    />
  );
}
