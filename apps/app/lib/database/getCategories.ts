import { supabase } from "../supabase";

export const getCategories = async ({
  search,
  limit = 25,
}: {
  search?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from("categories_view")
    .select("id, name, slug, icon, tools, picks")
    .order("name");

  if (search) {
    // query = query.limit(limit);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type CategoriesResponse = Awaited<ReturnType<typeof getCategories>>;
