import { useAuth } from "../providers/AuthProvider";
import { SignInButton } from "./SignInButton";

export function AuthSwitch({ children }: { children: JSX.Element }) {
  const { session, user } = useAuth();

  return session ? children : <SignInButton />;
}
