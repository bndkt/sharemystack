import { Check, Plus } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { ToolIcon } from "@/components/icons/ToolIcon";
import { useMyStack } from "@/components/providers/MyStackProvider";
import { CategoryResponse, getCategory } from "@/lib/database/getCategory";
import { ToolsResponse, getTools } from "@/lib/database/getTools";

export default function Edit() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<CategoryResponse["data"]>(null);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);
  const { category: slug } = useLocalSearchParams<{ category: string }>();
  const { addPick, removePick } = useMyStack();

  useEffect(() => {
    if (slug) {
      getCategory({ slug }).then(({ data }) => {
        if (data?.id) {
          setCategory(data);
          getTools({ categoryId: data.id }).then(({ data }) => {
            setTools(data);
            setLoading(false);
          });
        }
      });
    }
  }, [slug, getTools, setTools]);

  return loading ? (
    <Loading message="Loading tools" />
  ) : (
    <>
      <Stack.Screen options={{ title: category?.name ?? "" }} />
      <YStack fullscreen>
        <List
          data={tools}
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.name}
                /* subTitle={`Included in ${item.all_picks} stack`.concat(
                  item.all_picks !== 1 ? "s" : ""
                )} */
                icon={<ToolIcon svgXml={item.icon} width="24" height="24" />}
                iconAfter={
                  item.user_picks ? (
                    <Check color="gray" size="$1" />
                  ) : (
                    <Plus size="$1" />
                  )
                }
                onPress={() =>
                  item.user_picks
                    ? item.id && removePick(item.id)
                    : item.id && category?.id && addPick(item.id, category.id)
                }
              />
            );
          }}
        />
      </YStack>
    </>
  );
}
