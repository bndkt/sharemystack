import { SignInButton } from "./SignInButton";
import { useAuth } from "../providers/AuthProvider";

export function withAuth(Component: React.FC) {
  function AuthSwitch() {
    const { session } = useAuth();

    return session ? <Component /> : <SignInButton />;
  }

  return AuthSwitch;
}
