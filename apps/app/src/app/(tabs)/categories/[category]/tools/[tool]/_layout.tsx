import { Stack, useLocalSearchParams } from "expo-router";

import { Loading } from "@/components/Loading";
import { ToolLayout } from "@/components/tools/tool/ToolLayout";
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
      <ToolLayout tool={tool} category={category} />
    </>
  );
}
