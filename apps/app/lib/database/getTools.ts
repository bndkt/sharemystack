import { supabase } from "../supabase";

export const getTools = async ({
  search,
  limit = 25,
}: {
  search?: string;
  limit?: number;
} = {}) => {
  let query = supabase
    .from("tools")
    .select("id, name, slug, color, icon, website")
    .order("name");

  if (search) {
    // query = query.limit(limit);
  }

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type ToolsResponse = Awaited<ReturnType<typeof getTools>>;
