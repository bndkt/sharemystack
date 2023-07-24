import { SignIn } from "./SignIn";

import { useAuth } from "@/hooks/useAuth";

export function withAuth(Component: React.FC) {
  function AuthSwitch() {
    const { session, user } = useAuth();

    return session && user ? <Component /> : <SignIn />;
  }

  return AuthSwitch;
}
