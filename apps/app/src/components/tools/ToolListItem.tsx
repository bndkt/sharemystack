import { Check, ChevronRight, Plus } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, ListItem } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export function ToolListItem({
  category,
  tool,
  compact,
  toolPage,
}: {
  category: Category;
  tool: Tool;
  compact?: boolean;
  toolPage?: boolean;
}) {
  const { stack, picks, user } = useAuth();
  const { capture } = useAnalytics();
  const { sync } = useSync();
  const router = useRouter();

  const pick = picks?.find(
    (pick) => pick.tool.id === tool.id && pick.category.id === category.id
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

  if (toolPage) {
    if (user) {
      return (
        <Button
          unstyled
          icon={
            pick ? <Check color="gray" size="$1.5" /> : <Plus size="$1.5" />
          }
          onPress={() => (pick ? remove(pick) : add(tool, category))}
        />
      );
    } else {
      return null;
    }
  } else {
    return (
      <ListItem
        title={tool.name}
        subTitle={
          compact
            ? undefined
            : `Included in ${tool.allPicks} stack`.concat(
                tool.allPicks !== 1 ? "s" : ""
              )
        }
        icon={<ToolIcon tool={tool} size={compact ? "$1.5" : "$3"} />}
        iconAfter={
          user && compact ? (
            pick ? (
              <Check color="gray" size="$1.5" />
            ) : (
              <Plus size="$1.5" />
            )
          ) : (
            <ChevronRight size="$1.5" />
          )
        }
        onPress={
          compact
            ? user
              ? () => (pick ? remove(pick) : add(tool, category))
              : undefined
            : () =>
                router.push(
                  `/(tabs)/categories/${category.slug}/tools/${tool.slug}`
                )
        }
      />
    );
  }
}
