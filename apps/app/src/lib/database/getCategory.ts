import { supabase } from "../supabase";

export const getCategory = async ({ slug }: { slug: string }) => {
  const query = supabase
    .from("categories_view")
    .select("id, created_at, name, slug, icon")
    .eq("slug", slug)
    .limit(1)
    .single();

  return await query;
};

export type CategoryResponse = Awaited<ReturnType<typeof getCategory>>;
