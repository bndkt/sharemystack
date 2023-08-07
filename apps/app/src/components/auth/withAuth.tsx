import { SignIn } from "./SignIn";

import { useAuth } from "@/hooks/useAuth";

export function withAuth(Component: React.FC, standalone?: boolean) {
  function AuthSwitch() {
    const { session, user } = useAuth();

    return session && user ? <Component /> : <SignIn standalone={standalone} />;
  }

  return AuthSwitch;
}
