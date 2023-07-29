import { Stack, useLocalSearchParams } from "expo-router";

import { Loading } from "@/components/Loading";
import { ToolLayout } from "@/components/tools/tool/ToolLayout";
import { useObservableTool } from "@/hooks/useObservableTool";

export default function Layout() {
  const { tool: toolSlug } = useLocalSearchParams<{ tool: string }>();

  if (!toolSlug) throw new Error("No tool slug provided");

  const { tool } = useObservableTool({
    slug: toolSlug,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  return (
    <>
      <Stack.Screen name="../" options={{ title: tool.name ?? "" }} />
      <ToolLayout tool={tool} />
    </>
  );
}
