import { Button } from "tamagui";

import { useAuth } from "../providers/AuthProvider";

export function SignOutButton() {
  const { signOut } = useAuth();

  return <Button onPress={signOut}>Sign out</Button>;
}
