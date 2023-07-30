import { Check, Plus } from "@tamagui/lucide-icons";
import { ListItem, YStack } from "tamagui";

import { List } from "../list";
import { ToolIcon } from "../tools/ToolIcon";

import { useAnalytics } from "@/hooks/useAnalytics";
import { sync } from "@/lib/sync";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Stack } from "@/model/Stack";
import { Tool } from "@/model/Tool";

export function UpdatePicksList({
  tools,
  picks,
  category,
  stack,
}: {
  tools: Tool[];
  picks: Pick[];
  category: Category;
  stack: Stack;
}) {
  const { capture } = useAnalytics();

  function addPick({
    stack,
    tool,
    category,
  }: {
    stack: Stack;
    tool: Tool;
    category: Category;
  }) {
    console.log("Add", tool.name, "in", category.name);
    stack.addPick(tool, category);
    // TODO: (Workaround) Sync manually, because otherwise an immediate deletion after adding would not work
    sync();
    capture("Add pick", {
      tool: tool.slug,
      category: category.slug,
      // stack: stack?.id,
    });
  }

  function removePick({ stack, pick }: { stack: Stack; pick: Pick }) {
    stack.removePick(pick);
    capture("Remove pick");
  }

  return (
    <YStack fullscreen minHeight={100}>
      <List
        data={tools}
        renderItem={({ item }) => {
          const pick = picks?.find(
            (pick) =>
              pick.tool.id === item.id &&
              pick.category.id === category.id &&
              pick.stack.id === stack.id
          );

          return (
            <ListItem
              title={item.name}
              icon={<ToolIcon tool={item} size={"$1.5"} />}
              iconAfter={
                pick ? <Check color="gray" size="$1.5" /> : <Plus size="$1.5" />
              }
              onPress={() =>
                pick
                  ? removePick({ stack, pick })
                  : addPick({ stack, tool: item, category })
              }
            />
          );
        }}
      />
    </YStack>
  );
}
