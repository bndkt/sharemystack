import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { SuggestionButton } from "@/components/SuggestionButton";
import { List } from "@/components/list";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { useCategory } from "@/hooks/data/useCategory";
import { ChevronRight } from "@tamagui/lucide-icons";

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
              <List
                data={tools}
                renderItem={({ item }) => (
                  <Link href={`/(tabs)/tools/${category.slug}/${item.slug}`}>
                    <ListItem
                      title={item.name}
                      subTitle={`Included in ${item.allPicks} stack`.concat(
                        item.allPicks !== 1 ? "s" : ""
                      )}
                      icon={<ToolIcon tool={item} size="$3" />}
                      iconAfter={<ChevronRight size="$1.5" />}
                    />
                  </Link>
                )}
              />
            )}
          />
        </YStack>
        <SuggestionButton suggestion="tool" />
      </YStack>
    </>
  );
}
