import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { ListItem, Text, YStack } from "tamagui";

import { List } from "@/components/List";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { useObservableCategories } from "@/hooks/useObservableCategories";
import { useRefresh } from "@/hooks/useRefresh";

export default function Index() {
  const categories = useObservableCategories();
  const { refresh, refreshing } = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <YStack fullscreen>
      <List
        data={categories}
        onRefresh={refresh}
        refreshing={refreshing}
        renderItem={({ item }) => {
          return (
            <Link href={`/(tabs)/(stacks)/stacks/my/picks/${item.slug}`}>
              <ListItem
                title={
                  item.isComingSoon ? (
                    <Text color="$gray8">{item.name}</Text>
                  ) : (
                    item.name
                  )
                }
                subTitle={
                  item.isComingSoon ? (
                    <Text color="$gray8">Coming soon</Text>
                  ) : (
                    `${item.numberOfTools ?? "0"} tool${
                      item.numberOfTools !== 1 ? "s" : ""
                    }`
                  )
                }
                icon={
                  <CategoryIcon
                    name={item.icon}
                    color={item.isComingSoon ? "$gray8" : undefined}
                  />
                }
                iconAfter={<ChevronRight size="$1" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
