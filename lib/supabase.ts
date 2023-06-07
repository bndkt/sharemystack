import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://wmruscfwlagunazmjwhh.supabase.co", // process.env.SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcnVzY2Z3bGFndW5hem1qd2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxMDU1NjgsImV4cCI6MjAwMTY4MTU2OH0.4pFZiBa1ZtkYKTtscdRM4dnBtX55iqMBur_wNZygEqQ" // process.env.SUPABASE_KEY
);
