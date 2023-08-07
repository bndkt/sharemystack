import { Stack, useLocalSearchParams } from "expo-router";

import { Loading } from "@/components/Loading";
import { ToolLayout } from "@/components/tools/tool/ToolLayout";
import { useCategory } from "@/hooks/data/useCategory";
import { useTool } from "@/hooks/data/useTool";

export default function Layout() {
  const { category: categorySlug } = useLocalSearchParams<{
    category: string;
  }>();

  if (!categorySlug) throw new Error("No category slug provided");

  const { category } = useCategory({
    slug: categorySlug,
  });

  const { tool: toolSlug } = useLocalSearchParams<{ tool: string }>();

  if (!toolSlug) throw new Error("No tool slug provided");

  const { tool } = useTool({
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
      <Stack.Screen name="../" options={{ title: tool.name ?? "" }} />
      <ToolLayout tool={tool} category={category} />
    </>
  );
}
