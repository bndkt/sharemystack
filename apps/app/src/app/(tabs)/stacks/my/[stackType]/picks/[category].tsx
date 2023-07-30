import { Stack, useLocalSearchParams } from "expo-router";

import { ListItem, YStack } from "tamagui";
import { List } from "@/components/list";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { Check, Plus } from "@tamagui/lucide-icons";
import { Tool } from "@/model/Tool";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Category } from "@/model/Category";
import { Pick } from "@/model/Pick";
import { useCategory } from "@/hooks/data/useCategory";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { Stack as StackModel } from "@/model/Stack";

export default function CategoryTools() {
  const { category: slug, stackType: stackTypeSlug } = useLocalSearchParams<{
    category: string;
    stackType: string;
  }>();
  const { capture } = useAnalytics();
  const { user } = useAuth();

  if (!slug) throw new Error("No category slug provided");

  const { category, tools } = useCategory({ slug });
  const { stack } = useProfile({ user, stackTypeSlug });

  function add({
    stack,
    tool,
    category,
  }: {
    stack: StackModel;
    tool: Tool;
    category: Category;
  }) {
    console.log("Add", tool.name, "in", category.name);
    stack.addPick(tool, category);
    // TODO: (Workaround) Sync manually, because otherwise an immediate deletion after adding would not work
    // sync();
    capture("Add pick", {
      tool: tool.slug,
      category: category.slug,
      // stack: stack?.id,
    });
  }

  function remove({ stack, pick }: { stack: StackModel; pick: Pick }) {
    stack.removePick(pick);
    capture("Remove pick");
  }

  return (
    <>
      <Stack.Screen options={{ title: category?.name ?? "" }} />
      <CustomSuspense
        data={stack}
        name="stack"
        component={(stack) => (
          <CustomSuspense
            data={category}
            name="category"
            component={(category) => {
              return (
                <YStack fullscreen minHeight={100}>
                  <List
                    data={tools}
                    renderItem={({ item }) => {
                      const pick = false; /* picks?.find(
                (pick) =>
                  pick.tool.id === tool.id && pick.category.id === category.id
              ); */

                      return (
                        <ListItem
                          title={item.name}
                          icon={<ToolIcon tool={item} size={"$1.5"} />}
                          iconAfter={
                            pick ? (
                              <Check color="gray" size="$1.5" />
                            ) : (
                              <Plus size="$1.5" />
                            )
                          }
                          onPress={() =>
                            pick
                              ? remove({ stack, pick })
                              : add({ stack, tool: item, category })
                          }
                        />
                      );
                    }}
                  />
                </YStack>
              );
            }}
          />
        )}
      />
    </>
  );
}
