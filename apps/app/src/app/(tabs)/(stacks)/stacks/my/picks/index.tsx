import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Text, YStack } from "tamagui";

import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import {
  CategoriesResponse,
  getCategories,
} from "@/lib/database/getCategories";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, [getCategories, setCategories]);

  return loading ? (
    <Loading message="Loading categories" />
  ) : (
    <YStack fullscreen>
      <List
        data={categories}
        renderItem={({ item }) => {
          return (
            <Link
              href={`/(tabs)/(stacks)/stacks/my/picks/tools?category=${item.slug}`}
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
                iconAfter={<ChevronRight size="$1" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
