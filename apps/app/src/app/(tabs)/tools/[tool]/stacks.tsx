import { useGlobalSearchParams } from "expo-router";
import { ListItem } from "tamagui";

import { Loading } from "@/components/Loading";
import { List } from "@/components/list";
import { useObservableTool } from "@/hooks/useObservableTool";

export default function Category() {
  const { tool: slug } = useGlobalSearchParams<{ tool: string }>();

  if (!slug) return null;

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
            />
          )}
        />
      )}
    </>
  );
}
