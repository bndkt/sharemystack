import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { supabase } from "../../lib/supabase";

type User = {
  name?: string;
} | null;

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  user: User;
}>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function useProtectedRoute() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // Redirect to the sign-in page.
      console.log("Redirecting to sign-in page");
      // router.replace("/(tabs)/(profile)/sign-in");
    }
  }, [user, router]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {},
        signOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
