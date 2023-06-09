import { Button } from "tamagui";

import { useAuth } from "./AuthProvider";

export function SignOutButton() {
  const { signOut } = useAuth();
  return <Button onPress={signOut}>Sign out</Button>;
}
