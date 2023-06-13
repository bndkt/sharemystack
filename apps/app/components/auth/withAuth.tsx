import { useAuth } from "../providers/AuthProvider";
import { SignInButton } from "./SignInButton";

export function withAuth(Component: React.FC) {
  function AuthSwitch() {
    const { session } = useAuth();

    return session ? <Component /> : <SignInButton />;
  }

  return AuthSwitch;
}
