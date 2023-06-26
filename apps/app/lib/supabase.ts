import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

import { Database } from "./database.types";

export const mmkv = new MMKV();

const storage = {
  setItem: (key: string, data: string) => mmkv.set(key, data),
  getItem: (key: string) => mmkv.getString(key) ?? "",
  removeItem: (key: string) => mmkv.delete(key),
};

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage,
    },
  }
);
