import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AuthUser, AuthSession } from "@supabase/supabase-js";

import { supabase } from "../../lib/supabase";

const AuthContext = React.createContext<{
  session: AuthSession | null;
  user: AuthUser | null;
  profile: {} | null;
  signIn: ({
    session,
    user,
  }: {
    session: AuthSession | null;
    user: AuthUser | null;
  }) => void;
  signOut: () => void;
}>({
  session: null,
  user: null,
  profile: null,
  signIn: () => {},
  signOut: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function useProtectedRoute() {
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (!session) {
      // Redirect to the sign-in page.
      console.log("Redirecting to sign-in page");
      // router.replace("/(tabs)/(profile)/sign-in");
    }
  }, [session, router]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<{} | null>(null);

  async function signIn({
    session,
    user,
  }: {
    session: AuthSession | null;
    user: AuthUser | null;
  }) {
    setSession(session);
    setUser(user);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setSession(null);

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

  /* async function getProfile() {
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        signOut();
      } else {
        setProfile(data);
      }
    }
  } */

  useEffect(() => {
    if (!session) getSession();
    if (session && !user) getUser();
    // if (session && !profile) getProfile();
  }, [session, user, profile]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
