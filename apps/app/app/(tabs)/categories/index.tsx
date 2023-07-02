import { useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { CategoryList } from "@/components/categories/CategoryList";
import {
  getCategories,
  CategoriesResponse,
} from "@/lib/database/getCategories";

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
    <Loading />
  ) : (
    <CategoryList categories={categories} suggestionButton={true} />
  );
}
