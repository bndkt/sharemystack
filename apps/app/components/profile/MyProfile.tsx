import { Avatar, H3, Image, Text, YStack } from "tamagui";
import { useAuth } from "../providers/AuthProvider";
import { SignOutButton } from "../providers/SignOutButton";

export function MyProfile() {
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
