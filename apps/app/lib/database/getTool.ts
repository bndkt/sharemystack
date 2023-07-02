import { supabase } from "../supabase";

export const getTool = async ({ slug }: { slug: string }) => {
  const query = supabase
    .from("tools")
    .select("id, name, slug, color, icon, website, twitter")
    .eq("slug", slug)
    .limit(1)
    .single();

  return await query;
};

export type ToolResponse = Awaited<ReturnType<typeof getTool>>;
