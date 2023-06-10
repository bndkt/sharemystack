import { redirect } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { LoaderArgs } from "@remix-run/cloudflare";
import { sign } from "@tsndr/cloudflare-worker-jwt";

import type { Database } from "../lib/database.types";

function createCannyToken(
  user: { avatarURL: string; email: string; id: string; name: string },
  key: string
) {
  var userData = {
    avatarURL: user.avatarURL,
    email: user.email,
    id: user.id,
    name: user.name,
  };
  return sign(userData, key, { algorithm: "HS256" });
}

export const loader = async ({ request, context }: LoaderArgs) => {
  const response = new Response();
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const companyID = url.searchParams.get("companyID");
  const cannyRedirect = url.searchParams.get("redirectUrl");

  if (code) {
    const supabaseClient = createServerClient<Database>(
      context.SUPABASE_URL as string,
      context.SUPABASE_ANON_KEY as string,
      { request, response }
    );

    const { data, error } = await supabaseClient.auth.exchangeCodeForSession(
      code
    );

    if (error) {
      console.error(error);

      return redirect("/", {
        headers: response.headers,
      });
    } else if (data.user.email) {
      const ssoToken = await createCannyToken(
        {
          avatarURL: data.user.user_metadata.avatar_url,
          email: data.user.email,
          id: data.user.id,
          name: data.user.user_metadata.full_name,
        },
        context.CANNY_PRIVATE_KEY as string
      );

      const redirectUrl =
        "https://canny.io/api/redirects/sso?companyID=" +
        companyID +
        "&ssoToken=" +
        ssoToken +
        "&redirect=" +
        cannyRedirect;

      return redirect(redirectUrl, {
        headers: response.headers,
      });
    }
  }
};
