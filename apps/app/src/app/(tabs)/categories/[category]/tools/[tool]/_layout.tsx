import { Stack, useLocalSearchParams } from "expo-router";
import { H3, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { MaterialTopTabs } from "@/components/MaterialTopTabs";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { useObservableTool } from "@/hooks/useObservableTool";

export default function Layout() {
  const { tool: slug } = useLocalSearchParams<{ tool: string }>();

  if (!slug) throw new Error("No tool slug provided");

  const { tool } = useObservableTool({
    slug,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  return (
    <>
      <Stack.Screen name="../../" options={{ title: tool.name ?? "" }} />
      {/* <Stack.Screen name="../../../" options={{ headerShown: false }} /> */}
      <YStack fullscreen>
        <XStack padding="$3" alignItems="center">
          <ToolIcon tool={tool} size={36} />
          <H3 marginLeft="$3">{tool.name}</H3>
        </XStack>
        <MaterialTopTabs>
          <MaterialTopTabs.Screen name="index" options={{ title: "Home" }} />
          <MaterialTopTabs.Screen name="stacks" options={{ title: "Stacks" }} />
        </MaterialTopTabs>
      </YStack>
    </>
  );
}
