import { Avatar, Button, Text, XStack, YStack } from "tamagui";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/hooks/useAuth";
import { Skull } from "@tamagui/lucide-icons";
import { useRefresh } from "@/hooks/useRefresh";

function Profile() {
  const { user } = useAuth();
  const { refresh } = useRefresh();

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
      <Button
        // themeInverse
        marginHorizontal="$3"
        onPress={() => refresh(true)}
        backgroundColor="$red10"
        color="$background"
        icon={Skull}
      >
        Nuke Local Database
      </Button>
    </YStack>
  );
}

export default withAuth(Profile);
