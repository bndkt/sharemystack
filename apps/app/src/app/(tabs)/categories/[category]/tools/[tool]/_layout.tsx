import { Stack, useLocalSearchParams } from "expo-router";
import { H3, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { MaterialTopTabs } from "@/components/MaterialTopTabs";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolListItem } from "@/components/tools/ToolListItem";
import { useObservableCategory } from "@/hooks/useObservableCategory";
import { useObservableTool } from "@/hooks/useObservableTool";

export default function Layout() {
  const { category: categorySlug } = useLocalSearchParams<{
    category: string;
  }>();

  if (!categorySlug) throw new Error("No category slug provided");

  const { category } = useObservableCategory({
    slug: categorySlug,
  });

  const { tool: toolSlug } = useLocalSearchParams<{ tool: string }>();

  if (!toolSlug) throw new Error("No tool slug provided");

  const { tool } = useObservableTool({
    slug: toolSlug,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  if (!category) {
    return <Loading message="Loading category" />;
  }

  return (
    <>
      <Stack.Screen name="../../" options={{ title: tool.name ?? "" }} />
      {/* <Stack.Screen name="../../../" options={{ headerShown: false }} /> */}
      <YStack fullscreen>
        <XStack padding="$3" alignItems="center">
          <ToolIcon tool={tool} size={36} />
          <H3 marginLeft="$3" flexGrow={1}>
            {tool.name}
          </H3>
          <ToolListItem category={category} tool={tool} toolPage={true} />
        </XStack>
        <MaterialTopTabs>
          <MaterialTopTabs.Screen name="index" options={{ title: "Home" }} />
          <MaterialTopTabs.Screen name="stacks" options={{ title: "Stacks" }} />
        </MaterialTopTabs>
      </YStack>
    </>
  );
}
