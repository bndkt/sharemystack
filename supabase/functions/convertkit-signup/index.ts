import { serve } from "std/server";
// import { UserResponse, createClient } from "@supabase/supabase-js";

// import { Database } from "../database.types.ts";

serve(async (req: Request) => {
  try {
    const result = fetch(
      `https://api.convertkit.com/v3/forms/<form_id>/subscribe`,
      {
        method: "POST",
        headers: {},
        body: JSON.stringify({
          api_key: "",
          email: "",
          tags: [],
        }),
      }
    );
    console.log({ result });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
