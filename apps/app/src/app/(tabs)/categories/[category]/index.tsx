import { Stack, useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ToolList } from "@/components/tools/ToolList";
import { useCategory } from "@/hooks/data/useCategory";

export default function Category() {
  const { category: slug } = useLocalSearchParams<{ category: string }>();

  if (!slug) throw new Error("No category slug provided");

  const { category, tools } = useCategory({
    slug,
  });

  return (
    <>
      <Stack.Screen name="../../" options={{ title: category?.name ?? "" }} />
      <YStack fullscreen>
        <YStack flexGrow={1}>
          <CustomSuspense
            data={category}
            name="category"
            component={(category) => (
              <ToolList category={category} tools={tools} />
            )}
          />
        </YStack>
        <SuggestionButton suggestion="tool" />
      </YStack>
    </>
  );
}
