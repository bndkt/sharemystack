import { Check, Plus } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { useMyStack } from "@/hooks/useMyStack";
import { useObservableCategory } from "@/hooks/useObservableCategory";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>();
  const [picks, setPicks] = useState<Pick[]>();
  const { category: slug } = useLocalSearchParams<{ category: string }>();
  const { stack, addPick, removePick } = useMyStack();

  if (!slug) throw new Error("No category slug provided");

  const category = useObservableCategory(slug);

  useEffect(() => {
    if (category) {
      console.log(category.slug);
      const subscription = category.tools.observe().subscribe((newTools) => {
        setTools(newTools);
      });

      return () => subscription.unsubscribe();
    }
  }, [category, setTools]);

  useEffect(() => {
    if (stack) {
      const subscription = stack.picks.observe().subscribe((newPicks) => {
        console.log("newPicks", newPicks.length);
        setPicks(newPicks);
      });

      return () => subscription.unsubscribe();
    }
  });

  if (!category) {
    return <Loading message="Loading category" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: category.name ?? "" }} />
      {!tools ? (
        <Loading message="Loading tools" />
      ) : (
        <YStack fullscreen>
          <List
            data={tools}
            renderItem={({ item }) => {
              const picked = Boolean(
                picks?.find((pick) => pick.tool.id === item.id)
              );

              return (
                <ListItem
                  title={item.name}
                  icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
                  iconAfter={
                    picked ? (
                      <Check color="gray" size="$1" />
                    ) : (
                      <Plus size="$1" />
                    )
                  }
                  onPress={() =>
                    picked ? removePick(item.id) : addPick(item.id, category.id)
                  }
                />
              );
            }}
          />
        </YStack>
      )}
    </>
  );
}
