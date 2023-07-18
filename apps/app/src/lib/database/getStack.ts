import { supabase } from "../supabase";

type Params =
  | {
      user?: never;
      slug: string;
    }
  | {
      user: string;
      slug?: never;
    };

export const getStack = async ({ user, slug }: Params) => {
  const query = supabase
    .from("stacks_view")
    .select(
      "id, name, slug, website, twitter, starred, stars, picks_view (stack_id, category_name, category_slug, tool_name, tool_id, tool_slug, tool_icon, tool_color)"
    )
    .eq(user ? "user_id" : "slug", user ?? slug)
    .limit(1)
    .maybeSingle();

  return await query;
};

export type StackResponse = Awaited<ReturnType<typeof getStack>>;