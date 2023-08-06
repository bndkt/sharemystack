import { LoaderArgs, redirect } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";

import { config } from "~/lib/config";
import { Database } from "~/lib/database.types";

export const loader = async ({ request, context }: LoaderArgs) => {
  return null;

  /* const response = new Response();
  const url = new URL(request.url);

  const companyId = url.searchParams.get("companyID");
  const redirectUrl = url.searchParams.get("redirect");

  const supabase = createServerClient<Database>(
    context.env.SUPABASE_URL,
    context.env.SUPABASE_ANON_KEY,
    { request, response }
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `https://${config.domain}/auth/callback?companyID=${companyId}&redirectUrl=${redirectUrl}`,
    },
  });

  if (data.url) {
    return redirect(data.url, {
      headers: response.headers,
    });
  } else {
    return redirect("/", {
      headers: response.headers,
    });
  } */
};
