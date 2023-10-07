import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

import { OgImage } from "~/components/OgImage";
import { getSupabaseClient } from "~/lib/supabase";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface Props {
  ogTitle: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const stack =
    context.params.stack && context.params.stack.length > 0
      ? context.params.stack[0]
      : null;

  if (!stack ?? stack?.substring(0, 1) !== "@") {
    return context.next();
  }

  const supabase = getSupabaseClient(
    context.env.SUPABASE_URL,
    context.env.SUPABASE_ANON_KEY
  );

  const slug = stack.substring(1);

  const { data, error } = await supabase
    .from("og_view")
    .select("icon_svg")
    .eq("profile_slug", slug)
    .neq("icon_svg", null)
    .limit(16);

  return vercelOGPagesPlugin<Props>({
    imagePathSuffix: "/social-image.png",
    component: ({ ogTitle, pathname }) => (
      <OgImage ogTitle={ogTitle} pathname={pathname} icons={data} />
    ),
    extractors: {
      on: {
        'meta[property="og:title"]': (props) => ({
          element(element) {
            props.ogTitle = element.getAttribute("content") ?? "";
          },
        }),
      },
    },
    autoInject: {
      openGraph: false,
    },
  })(context);
};
