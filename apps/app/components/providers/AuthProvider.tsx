import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";

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
  const segments = useSegments();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/sign-in");
    }
  }, [user, segments]);
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
