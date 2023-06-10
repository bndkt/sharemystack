import { LoaderArgs, redirect } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import { config } from "~/lib/config";
import { Database } from "~/lib/database.types";

export const loader = async ({ request, context }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);

  const companyId = url.searchParams.get("companyID");
  const redirectUrl = url.searchParams.get("redirect");

  const supabase = createServerClient<Database>(
    context.SUPABASE_URL as string,
    context.SUPABASE_ANON_KEY as string,
    { request, response }
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
    options: {
      redirectTo: `https://${config.domain}/auth/callback?companyID=${companyId}&redirectUrl=${redirectUrl}`,
    },
  });

  if (data.url) {
    console.log("Redirect", data.url);

    return redirect(data.url, {
      headers: response.headers,
    });
  } else {
    return redirect("/", {
      headers: response.headers,
    });
  }
};
