import { useContext } from "react";

import { AuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  return useContext(AuthContext);
}
