import * as core from "@actions/core";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../types/database.types.js";

const supabaseUrl = core.getInput("supabaseUrl");
const supabaseKey = core.getInput("supabaseKey");

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
