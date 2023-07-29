import { useLocalSearchParams } from "expo-router";
import { Text, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { ToolLink } from "@/components/tools/ToolLink";
import { useObservableTool } from "@/hooks/useObservableTool";

export function ToolIndex() {
  const { tool: slug } = useLocalSearchParams<{ tool: string }>();

  if (!slug) throw new Error("No tool slug provided");

  const { tool } = useObservableTool({
    slug,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  return (
    <YStack fullscreen padding="$3">
      <Text textAlign="center" paddingVertical="$6">
        More content coming soon.
      </Text>
      <ToolLink tool={tool} />
    </YStack>
  );
}
