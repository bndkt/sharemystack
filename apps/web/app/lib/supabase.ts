import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export const getSupabaseClient = (supabaseUrl: string, supabaseKey: string) =>
  createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
