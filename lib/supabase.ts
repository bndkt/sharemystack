import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv"; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtcnVzY2Z3bGFndW5hem1qd2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxMDU1NjgsImV4cCI6MjAwMTY4MTU2OH0.4pFZiBa1ZtkYKTtscdRM4dnBtX55iqMBur_wNZygEqQ"

import { Database } from "./database.types";

export const mmkv = new MMKV();

const storage = {
  setItem: (key: string, data: string) => mmkv.set(key, data),
  getItem: (key: string) => mmkv.getString(key),
  removeItem: (key: string) => mmkv.delete(key),
};

// TMP until Expo SDK 49
process.env.SUPABASE_URL = "http://localhost:54321"; // "https://wmruscfwlagunazmjwhh.supabase.co"
process.env.SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      storage,
    },
  }
);
