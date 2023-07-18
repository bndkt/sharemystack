import { supabase } from "../supabase";

export const getTools = async ({
  search,
  categoryId,
  limit = 100,
}: {
  search?: string;
  categoryId?: string;
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

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type ToolsResponse = Awaited<ReturnType<typeof getTools>>;
