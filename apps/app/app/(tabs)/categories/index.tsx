import { useEffect, useState } from "react";
import { Spinner } from "tamagui";

import {
  getCategories,
  CategoriesResponse,
} from "@/lib/database/getCategories";
import { CategoryList } from "@/components/categories/CategoryList";

export default function Categories() {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] =
    useState<CategoriesResponse["data"]>(null);

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data);
      setLoading(false);
    });
  }, [getCategories, setCategories]);

  return isLoading ? (
    <Spinner />
  ) : (
    <CategoryList categories={categories} suggestionButton={true} />
  );
}
