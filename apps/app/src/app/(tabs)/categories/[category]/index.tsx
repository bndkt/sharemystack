import { Stack, useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
import { ToolList } from "@/components/tools/ToolList";
import { useObservableCategory } from "@/hooks/useObservableCategory";

export default function Category() {
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
      <Stack.Screen name="../../" options={{ title: category.name ?? "" }} />
      <YStack fullscreen>
        <YStack flexGrow={1}>
          {loading ? (
            <Loading message="Loading tools" />
          ) : (
            <ToolList category={category} tools={tools} />
          )}
        </YStack>
        <SuggestionButton suggestion="tool" />
      </YStack>
    </>
  );
}
