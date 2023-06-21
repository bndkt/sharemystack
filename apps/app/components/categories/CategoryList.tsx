import { GestureResponderEvent } from "react-native";
import { YStack } from "tamagui";

import { List } from "../List";
import { CategoriesResponse } from "../../lib/database/getCategories";
import { CategoryIcon } from "../icons/CategoryIcon";
import { SuggestionButton } from "../SuggestionButton";

export function CategoryList({
  categories,
  onPress,
  suggestionButton,
}: {
  categories: CategoriesResponse["data"];
  onPress?: (tool: string | null) => void;
  suggestionButton?: boolean;
}) {
  return (
    <YStack fullscreen>
      <List
        data={categories}
        href={!onPress ? (item) => `/categories/${item.slug}` : undefined}
        onPress={onPress ? (item) => onPress(item.id) : undefined}
        title={(item) => item.name}
        subTitle={(item) =>
          `${item.tools ?? "0"} tool${item.tools !== 1 ? "s" : ""}`
        }
        icon={(item) => (
          <CategoryIcon name={item.icon} width="24" height="24" />
        )}
      />
      {suggestionButton && <SuggestionButton suggestion="category" />}
    </YStack>
  );
}
