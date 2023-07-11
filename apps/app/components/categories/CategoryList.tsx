import { Text } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";

import { List } from "../List";
import { CategoriesResponse } from "../../lib/database/getCategories";
import { CategoryIcon } from "../icons/CategoryIcon";

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
      href={
        !onPress && false ? (item) => `/categories/${item.slug}` : undefined // Deactivated
      }
      onPress={
        onPress
          ? (item) => (!item.soon ? onPress(item.id) : undefined)
          : undefined
      }
      title={(item) =>
        item.soon ? <Text color="$gray8">{item.name}</Text> : item.name
      }
      subTitle={(item) =>
        item.soon ? (
          <Text color="$gray8">Coming soon</Text>
        ) : (
          `${item.tools ?? "0"} tool${item.tools !== 1 ? "s" : ""}`
        )
      }
      icon={(item) => (
        <CategoryIcon
          name={item.icon}
          width="24"
          height="24"
          color={item.soon ? "$gray8" : undefined}
        />
      )}
      iconAfter={(item) => (item.soon ? undefined : <ChevronRight size="$1" />)}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}
