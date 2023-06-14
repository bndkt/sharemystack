import { YStack } from "tamagui";

import { List } from "../List";
import { CategoriesResponse } from "../../lib/database/getCategories";
import { CategoryIcon } from "../icons/CategoryIcon";
import { SuggestionButton } from "../SuggestionButton";

export function CategoryList({
  categories,
}: {
  categories: CategoriesResponse["data"];
}) {
  return (
    <YStack fullscreen>
      <List
        data={categories}
        href={(item) => `/categories/@${item.slug}`}
        title={(item) => item.name}
        subTitle={(item) =>
          `${item.categorizations[0].count ?? "0"} tool${
            (item.categorizations[0].count as number) !== 1 ? "s" : ""
          }`
        }
        icon={(item) => (
          <CategoryIcon name={item.icon} width="24" height="24" />
        )}
      />
      <SuggestionButton suggestion="category" />
    </YStack>
  );
}
