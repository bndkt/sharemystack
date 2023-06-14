import { supabase } from "../supabase";

export const getStacks = async ({
  featured = false,
  starred = false,
  updated = false,
  limit = 25,
}: {
  featured?: boolean;
  starred?: boolean;
  updated?: boolean;
  limit?: number;
} = {}) => {
  let query = supabase
    .from("stacks_view")
    .select(
      "id, name, slug, website, twitter, twitter_image_url, starred, stars"
    );
  if (updated) {
    query = query.order("updated_at", { ascending: false });
  }
  if (featured) {
    query = query.eq("featured", true);
  }
  if (starred) {
    query = query.eq("starred", true);
  }
  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};

export type StacksResponse = Awaited<ReturnType<typeof getStacks>>;
