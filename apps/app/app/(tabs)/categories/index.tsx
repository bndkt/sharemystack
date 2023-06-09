import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Separator, Spinner, YStack } from "tamagui";

import { SuggestionButton } from "../../../components/SuggestionButton";
import { CategoryIcon } from "../../../components/icons/CategoryIcon";
import { supabase } from "../../../lib/supabase";

export default function Categories() {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState<
    {
      id: string;
      name: string;
      slug: string;
      icon: string;
      categorizations: { count: number }[];
    }[]
  >([]);

  const getCategories = async () => {
    try {
      const { data } = await supabase
        .from("categories")
        .select("id, name, slug, icon, categorizations (count)")
        .order("name");
      console.log({ data });
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <YStack fullscreen>
        <FlashList
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => {
            return (
              <Link href={`/categories/${item.slug}`}>
                <ListItem
                  title={item.name}
                  subTitle={`${item.categorizations[0].count ?? "0"} tool${
                    item.categorizations[0].count > 1 ? "s" : ""
                  }`}
                  iconAfter={ChevronRight}
                  icon={
                    <CategoryIcon name={item.icon} width="24" height="24" />
                  }
                />
              </Link>
            );
          }}
          estimatedItemSize={categories.length}
          data={categories}
        />
        <SuggestionButton suggestion="category" />
      </YStack>
    </>
  );
}
