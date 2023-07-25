import { AuthUser, AuthSession } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useObservableStack } from "@/hooks/useObservableStack";
import { supabase } from "@/lib/supabase";
import { Pick } from "@/model/Pick";
import { Stack } from "@/model/Stack";

export const AuthContext = createContext<{
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: ({
    session,
    user,
  }: {
    session: AuthSession | null;
    user: AuthUser | null;
  }) => void;
  signOut: () => void;
  stack?: Stack | undefined;
  picks?: Pick[] | undefined;
  isLoadingStack?: boolean;
}>({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const {
    stack,
    picks,
    loading: isLoadingStack,
  } = useObservableStack({
    userId: user?.id ?? null,
    loadPicks: true,
  });
  const { identify, logout, capture } = useAnalytics();

  async function signIn({
    session,
    user,
  }: {
    session: AuthSession | null;
    user: AuthUser | null;
  }) {
    setSession(session);
    setUser(user);
    identify(user?.id, user?.email);
    capture("Sign in", { user: user?.id });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    logout();
    setSession(null);
    setUser(null);
    capture("Sign out");

    if (error) {
      console.error(error);
    }
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      signOut();
    } else {
      setSession(data.session);
    }
  }

  async function getUser() {
    if (session) {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        signOut();
      } else {
        setUser(data.user);
      }
    }
  }

  useEffect(() => {
    if (!session) getSession();
    if (session && !user) getUser();
  }, [session, user]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        stack,
        picks,
        isLoadingStack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
