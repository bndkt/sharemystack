import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { Button, Label, Switch, Text, XStack, YStack } from "tamagui";

// import { DeleteUserButton } from "./DeleteUserButton";

import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/hooks/useAuth";
import { storage } from "@/lib/storage";

function User() {
  const { user, signOut } = useAuth();
  const postHog = usePostHog();
  const [isBetaUser, setIsBetaUser] = useState<boolean>(
    storage.getBoolean("isBetaUser") || false
  );

  function toggleIsBetaUser() {
    setIsBetaUser((prev) => {
      postHog?.capture("toggle_beta_user", { $set: { is_beta_user: !prev } });
      storage.set("isBetaUser", !prev);

      return !prev;
    });
  }

  return (
    <YStack padding="$3" space="$3">
      <Text>Email: {user?.email}</Text>
      <XStack alignItems="center" space="$3">
        <Switch
          id="includeHandleSwitch"
          size="$4"
          native
          checked={isBetaUser}
          onCheckedChange={toggleIsBetaUser}
        />
        <Label
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          htmlFor="includeHandleSwitch"
        >
          Enable beta features
        </Label>
      </XStack>
      {/* <DeleteUserButton /> */}
      <Button onPress={signOut}>Sign out</Button>
    </YStack>
  );
}

export default withAuth(User);
