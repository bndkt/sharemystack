import { Check, ChevronRight, Plus } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { ToolIcon } from "../icons/ToolIcon";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export function ToolListItem({
  category,
  item,
  compact,
}: {
  category: Category;
  item: Tool;
  compact?: boolean;
}) {
  const { stack, picks, user } = useAuth();
  const { capture } = useAnalytics();
  const { sync } = useSync();
  const router = useRouter();

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
      subTitle={
        compact
          ? undefined
          : `Included in ${item.allPicks} stack`.concat(
              item.allPicks !== 1 ? "s" : ""
            )
      }
      icon={<ToolIcon tool={item} size={compact ? undefined : 36} />}
      iconAfter={
        user && compact ? (
          pick ? (
            <Check color="gray" size="$1" />
          ) : (
            <Plus size="$1" />
          )
        ) : (
          <ChevronRight size="$1" />
        )
      }
      onPress={
        compact
          ? user
            ? () => (pick ? remove(pick) : add(item, category))
            : undefined
          : () =>
              router.push(
                `/(tabs)/categories/${category.slug}/tools/${item.slug}`
              )
      }
    />
  );
}
