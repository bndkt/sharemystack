import { Button } from "tamagui";

import { useAuth } from "@/hooks/useAuth";

export function SignOutButton() {
  const { signOut } = useAuth();

  return <Button onPress={signOut}>Sign out</Button>;
}
