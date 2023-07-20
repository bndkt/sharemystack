import { Check, Plus } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { useObservableCategory } from "@/hooks/useObservableCategory";
import { Tool } from "@/model/Tool";
import { useMyStack } from "@/providers/MyStackProvider";

export default function Edit() {
  const [tools, setTools] = useState<Tool[]>();
  const { category: slug } = useLocalSearchParams<{ category: string }>();
  const { addPick, removePick } = useMyStack();

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
              return (
                <ListItem
                  title={item.name}
                  icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
                  iconAfter={
                    item.userPicks ? (
                      <Check color="gray" size="$1" />
                    ) : (
                      <Plus size="$1" />
                    )
                  }
                  onPress={() =>
                    item.userPicks
                      ? item.id && removePick(item.id)
                      : item.id && category?.id && addPick(item.id, category.id)
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
