import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";
import { storage } from "./storage";

const authStorage = {
  setItem: (key: string, data: string) => storage.set(key, data),
  getItem: (key: string) => storage.getString(key) ?? "",
  removeItem: (key: string) => storage.delete(key),
};

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      storage: authStorage,
    },
  }
);
