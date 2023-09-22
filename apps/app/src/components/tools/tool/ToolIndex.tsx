import { useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { ToolContent } from "./ToolContent";

import { Loading } from "@/components/Loading";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { useTool } from "@/hooks/data/useTool";
import { getContentTool } from "@/lib/sanity";

export function ToolIndex() {
  const { tool: slug } = useLocalSearchParams<{ tool: string }>();

  if (!slug) throw new Error("No tool slug provided");

  const { tool } = useTool({
    slug,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  const toolContent = getContentTool(tool.slug);

  return (
    <YStack fullscreen padding="$3">
      <YStack flexGrow={1}>
        <CustomSuspense
          promise={toolContent}
          name="content"
          component={(content) => <ToolContent content={content} />}
        />
      </YStack>
    </YStack>
  );
}
