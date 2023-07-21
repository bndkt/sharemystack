import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { useMyStack } from "@/hooks/useMyStack";
import { useObservableCategory } from "@/hooks/useObservableCategory";
import { Pick } from "@/model/Pick";
import { Tool } from "@/model/Tool";
import { PickTool } from "@/components/stacks/PickTool";

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>();
  // const [picks, setPicks] = useState<Pick[]>();
  const { category: slug } = useLocalSearchParams<{ category: string }>();
  const { stack, picks } = useMyStack();

  if (!slug) throw new Error("No category slug provided");

  const { category, loading } = useObservableCategory(slug);

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
      {loading ? (
        <Loading message="Loading tools" />
      ) : (
        <YStack fullscreen>
          <List
            data={tools}
            renderItem={({ item }) => (
              <PickTool category={category} item={item} picks={picks} />
            )}
          />
        </YStack>
      )}
    </>
  );
}
