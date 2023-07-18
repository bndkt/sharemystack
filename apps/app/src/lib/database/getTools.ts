import { supabase } from "../supabase";

export const getTools = async ({
  search,
  category,
  limit = 100,
}: {
  search?: string;
  category?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    // .from(category ? "categories_tools_view" : "tools_view")
    .from("tools_view")
    .select("id, name, slug, color, icon, website, user_picks, all_picks")
    .order("name");

  if (search) {
    // query = query.limit(limit);
  }

  if (category) {
    query = query.eq("category_slug", category);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type ToolsResponse = Awaited<ReturnType<typeof getTools>>;
