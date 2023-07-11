import { useEffect, useState } from "react";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { SuggestionButton } from "@/components/SuggestionButton";
import { CategoryList } from "@/components/categories/CategoryList";
import {
  getCategories,
  CategoriesResponse,
} from "@/lib/database/getCategories";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);

  function loadData() {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <YStack fullscreen>
      <CategoryList
        categories={categories}
        suggestionButton={true}
        onRefresh={() => {
          setRefreshing(true);
          loadData();
        }}
        refreshing={refreshing}
      />
      <SuggestionButton suggestion="category" />
    </YStack>
  );
}
