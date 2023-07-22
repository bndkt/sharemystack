import { SignInButton } from "./SignInButton";

import { useAuth } from "@/hooks/useAuth";

export function withAuth(Component: React.FC) {
  function AuthSwitch() {
    const { session, user } = useAuth();

    return session && user ? <Component /> : <SignInButton />;
  }

  return AuthSwitch;
}
