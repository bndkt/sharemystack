import { Check, Plus } from "@tamagui/lucide-icons";
import { ListItem, YStack } from "tamagui";

import { List } from "../list";
import { ToolIcon } from "../tools/ToolIcon";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useSync } from "@/hooks/useSync";
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
  const { queueSync } = useSync();
  const { addTag, addTrigger } = useAnalytics();

  function addPick({ stack, tool }: { stack: Stack; tool: Tool }) {
    stack.addPick(tool, category);
    // TODO: (Workaround) Sync manually, because otherwise an immediate deletion after adding would not work
    queueSync();
    capture("pick_added", {
      tool: tool.slug,
      category: category.slug,
      // stack: stack?.id,
    });
    addTag("pick_added", "now()");
    addTrigger("pick_added", "true");
  }

  function removePick({ stack, pick }: { stack: Stack; pick: Pick }) {
    stack.removePick(pick);
    capture("pick_removed");
    addTag("pick_removed", "now()");
    addTrigger("pick_removed", "true");
  }

  function matchPick(tool: Tool) {
    return picks?.find(
      (pick) =>
        pick.tool.id === tool.id &&
        pick.category.id === category.id &&
        pick.stack.id === stack.id,
    );
  }

  return (
    <YStack fullscreen minHeight={100}>
      <List
        data={tools}
        extraData={picks}
        renderItem={({ item }) => {
          const pick = matchPick(item);

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
                  : addPick({ stack, tool: item })
              }
            />
          );
        }}
      />
    </YStack>
  );
}
