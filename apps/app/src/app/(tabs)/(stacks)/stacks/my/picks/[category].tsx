import { Stack, useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PickTool } from "@/components/stacks/PickTool";
import { useObservableCategory } from "@/hooks/useObservableCategory";

export default function Tools() {
  const { category: slug } = useLocalSearchParams<{ category: string }>();

  if (!slug) throw new Error("No category slug provided");

  const { category, tools, loading } = useObservableCategory({
    slug,
    loadTools: true,
  });

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
              <PickTool category={category} item={item} />
            )}
          />
        </YStack>
      )}
    </>
  );
}
