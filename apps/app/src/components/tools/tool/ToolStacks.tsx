import { Layers } from "@tamagui/lucide-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { Loading } from "@/components/Loading";
import { List } from "@/components/list";
import { useObservableTool } from "@/hooks/useObservableTool";

export function ToolStacks() {
  const { tool: slug } = useGlobalSearchParams<{ tool: string }>();
  const router = useRouter();

  const { tool, picks, loading } = useObservableTool({
    slug,
    loadPicks: true,
  });

  if (!tool) {
    return <Loading message="Loading tool" />;
  }

  return (
    <>
      {loading ? (
        <Loading message="Loading stacks" />
      ) : (
        <List
          data={picks}
          renderItem={({ item }) => (
            <ListItem
              title={item.stackName}
              subTitle={`in ${item.categoryName}`}
              onPress={() => router.push(`/(tabs)/(stacks)/@${item.stackSlug}`)}
              iconAfter={<Layers size="$1.5" />}
            />
          )}
        />
      )}
    </>
  );
}
