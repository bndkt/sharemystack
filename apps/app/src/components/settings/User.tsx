import { Avatar, Text, XStack, YStack } from "tamagui";

import { DeleteUserButton } from "./DeleteUserButton";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/hooks/useAuth";

function User() {
  const { user } = useAuth();

  return (
    <YStack padding="$3">
      <XStack>
        {user?.user_metadata.picture && (
          <Avatar circular size="$3" marginRight="$3">
            <Avatar.Image src={user.user_metadata.picture} />
            <Avatar.Fallback bc="#f43f5e" delayMs={1000} />
          </Avatar>
        )}
        <YStack>
          {/* <Text>Username: @{user?.user_metadata.preferred_username}</Text> */}
          <Text>Email: {user?.email}</Text>
        </YStack>
      </XStack>
      <DeleteUserButton />
      <SignOutButton />
    </YStack>
  );
}

export default withAuth(User);
