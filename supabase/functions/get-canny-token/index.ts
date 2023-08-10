import { serve } from "std/server";
import { UserResponse, createClient } from "@supabase/supabase-js";
import { create } from "djwt";

import { Database } from "../database.types.ts";

async function createCannyToken(
  user: NonNullable<NonNullable<UserResponse["data"]>["user"]>,
  profile: { twitter_image_url?: string | null; name?: string | null }
) {
  const userData = {
    id: user.id,
    email: user.email,
    name: profile?.name,
    avatarURL: profile?.twitter_image_url,
  };

  const enc = new TextEncoder();
  const rawKey = enc.encode(Deno.env.get("CANNY_PRIVATE_KEY") ?? "");
  const algorithm = {
    name: "HMAC",
    hash: { name: "SHA-256" },
  };
  const key = await crypto.subtle.importKey("raw", rawKey, algorithm, false, [
    "sign",
  ]);

  const jwt = await create({ alg: "HS256", typ: "JWT" }, userData, key);

  return jwt;
}

serve(async (req: Request) => {
  try {
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") as string,
      Deno.env.get("SUPABASE_ANON_KEY") as string,
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
        auth: { persistSession: false },
      }
    );
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (user) {
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select()
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        const jwt = await createCannyToken(user, profile);

        return new Response(JSON.stringify({ jwt }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({ error: "No profile" }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }
    } else {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
