import { supabase } from "../supabase";

export const getCategory = async ({ slug }: { slug: string }) => {
  let query = supabase
    .from("categories")
    .select("id, created_at, name, slug, icon")
    .eq("slug", slug)
    .limit(1)
    .single();

  return await query;
};

export type CategoryResponse = Awaited<ReturnType<typeof getCategory>>;
