import { SignInButton } from "./SignInButton";

import { useAuth } from "@/hooks/useAuth";

export function withAuth(Component: React.FC) {
  function AuthSwitch() {
    const { session } = useAuth();

    return session ? <Component /> : <SignInButton />;
  }

  return AuthSwitch;
}
