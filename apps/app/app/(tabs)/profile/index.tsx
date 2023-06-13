import { Avatar, Text, YStack } from "tamagui";

import { useAuth } from "../../../components/providers/AuthProvider";
import { SignOutButton } from "../../../components/providers/SignOutButton";
import { withAuth } from "../../../components/auth/withAuth";

function Profile() {
  const { user } = useAuth();

  console.log({ user });

  return (
    <YStack padding="$3">
      <Text>Username: {user?.user_metadata.preferred_username}</Text>
      {user?.user_metadata.picture && (
        <Avatar circular size="$6">
          <Avatar.Image src={user.user_metadata.picture} />
          <Avatar.Fallback bc="red" />
        </Avatar>
      )}
      <Text>Email: {user?.email}</Text>
      <SignOutButton />
    </YStack>
  );
}

export default withAuth(Profile);
