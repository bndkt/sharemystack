import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { ToolsResponse, getTools } from "@/lib/database/getTools";

export default function Edit() {
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);
  const { category } = useLocalSearchParams<{ category: string }>();

  console.log({ category });

  useEffect(() => {
    getTools({ category }).then(({ data }) => {
      setTools(data);
      setLoading(false);
    });
  }, [getTools, setTools]);

  return loading ? (
    <Loading message="Loading tools" />
  ) : (
    <>
      <Stack.Screen options={{ title: category }} />
      <YStack fullscreen>
        <List
          data={tools}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.name}
                subTitle={`Included in ${item.all_picks} stack`.concat(
                  item.all_picks !== 1 ? "s" : ""
                )}
                icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
              />
            );
          }}
        />
      </YStack>
    </>
  );
}
