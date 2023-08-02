import * as core from "@actions/core";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../types/database.types.js";

const supabaseUrl =
  core.getInput("supabaseUrl") || (process.env.SUPABASE_URL as string);
const supabaseKey =
  core.getInput("supabaseKey") || (process.env.SUPABASE_KEY as string);

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
