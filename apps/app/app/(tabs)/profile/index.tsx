import { Avatar, Text, XStack, YStack } from "tamagui";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/components/providers/AuthProvider";

function Profile() {
  const { user } = useAuth();

  console.log({ user });

  return (
    <YStack padding="$3">
      <XStack marginBottom="$3">
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
      <SignOutButton />
    </YStack>
  );
}

export default withAuth(Profile);
