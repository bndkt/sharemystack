import { Link } from "expo-router";
import { ListItem, Text } from "tamagui";

import { List } from "@/components/List";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { CategoriesResponse } from "@/lib/database/getCategories";

export function CategoryList({
  categories,
  onPress,
  suggestionButton,
  onRefresh,
  refreshing,
}: {
  categories: CategoriesResponse["data"];
  onPress?: (tool: string | null) => void;
  suggestionButton?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  return (
    <List
      data={categories}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => {
        return (
          <Link
            href={
              "/categories" // item.soon ? "/categories" : `/categories/${item.slug}`
            }
          >
            <ListItem
              title={
                item.soon ? <Text color="$gray8">{item.name}</Text> : item.name
              }
              subTitle={
                item.soon ? (
                  <Text color="$gray8">Coming soon</Text>
                ) : (
                  `${item.tools ?? "0"} tool${item.tools !== 1 ? "s" : ""}`
                )
              }
              icon={
                <CategoryIcon
                  name={item.icon}
                  color={item.soon ? "$gray8" : undefined}
                />
              }
              // iconAfter={item.soon ? undefined : <ChevronRight size="$1" />}
            />
          </Link>
        );
      }}
    />
  );
}
