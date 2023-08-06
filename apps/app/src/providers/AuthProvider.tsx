import { AuthUser, AuthSession, RealtimeChannel } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

import { useProfile } from "@/hooks/data/useProfile";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSync } from "@/hooks/useSync";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/model/Profile";
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
  profile?: Profile | null | undefined;
  createProfile?: ({
    name,
    slug,
  }: {
    name: string;
    slug: string;
  }) => Promise<void>;
  stacks?: Stack[] | null | undefined;
}>({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { profile, createProfile, stacks } = useProfile({ user });
  const { identify, logout, capture } = useAnalytics();
  const [channel, setChannel] = useState<RealtimeChannel>();
  const { shouldBroadcast, queueSync, handleBroadcastSent } = useSync();

  async function signIn({
    session,
    user,
  }: {
    session: AuthSession | null;
    user: AuthUser | null;
  }) {
    setSession(session);
    setUser(user);
    identify({
      externalId: user?.id,
      email: user?.email,
      handle: profile?.slug,
    });
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

  // Subscribe to broadcasts
  useEffect(() => {
    if (user) {
      const channel = supabase.channel(`sync-${user.id}`);
      const subscription = channel
        .on("broadcast", { event: "sync" }, (payload) => {
          console.log("Broadcast received", payload);
          queueSync({ broadcast: false });
        })
        .subscribe();

      console.log("Subscribed to broadcast", `sync-${user.id}`);

      setChannel(channel);

      return () => {
        subscription.unsubscribe();
        console.log("Unsubscribed from broadcast");
      };
    }
  }, [user]);

  // Send broadcast
  useEffect(() => {
    if (channel && shouldBroadcast) {
      console.log("♻️ Sending broadcast");
      channel
        .send({
          type: "broadcast",
          event: "sync",
        })
        .then((response) => {
          console.log("♻️ Broadcast sent", response);
        });
      handleBroadcastSent();
    }
  }, [channel, shouldBroadcast]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        profile,
        createProfile,
        stacks,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
