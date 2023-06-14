import { supabase } from "../supabase";

export const getCategories = async ({
  search,
  limit = 25,
}: {
  search?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from("categories")
    .select("id, name, slug, icon, categorizations (count)")
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
