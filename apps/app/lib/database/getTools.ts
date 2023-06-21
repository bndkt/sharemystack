import { supabase } from "../supabase";

export const getTools = async ({
  search,
  category,
  limit = 25,
}: {
  search?: string;
  category?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from(category ? "categories_tools_view" : "tools_view")
    .select("id, name, slug, color, icon, website")
    .order("name");

  if (search) {
    // query = query.limit(limit);
  }

  if (category) {
    query = query.eq("category_id", category);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type ToolsResponse = Awaited<ReturnType<typeof getTools>>;
