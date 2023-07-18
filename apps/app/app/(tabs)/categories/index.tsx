import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Text, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import {
  getCategories,
  CategoriesResponse,
} from "@/lib/database/getCategories";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);

  function loadData() {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading message="Loading categories" />
  ) : (
    <YStack fullscreen>
      <List
        data={categories}
        renderItem={({ item }) => {
          return (
            <Link
              href={
                "/categories" // || item.soon ? "/categories" : `/categories/${item.slug}`
              }
            >
              <ListItem
                title={
                  item.soon ? (
                    <Text color="$gray8">{item.name}</Text>
                  ) : (
                    item.name
                  )
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
      <SuggestionButton suggestion="category" />
    </YStack>
  );
}
