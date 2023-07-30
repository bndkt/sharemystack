import { Stack } from "expo-router";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { CreateProfile } from "@/components/my/CreateProfile";
import { MyProfileHeader } from "@/components/my/MyProfileHeader";
import { useAuth } from "@/hooks/useAuth";

export function MyProfile() {
  const { profile } = useAuth();

  return profile ? (
    <YStack fullscreen>
      <MyProfileHeader profile={profile} />

      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "My Stacks", headerShown: false }}
        />
        <Stack.Screen
          name="[stackType]"
          options={{ title: "Stack", headerBackTitle: "My Stacks" }}
        />
      </Stack>
    </YStack>
  ) : profile === null ? (
    <CreateProfile />
  ) : (
    <Loading message="Loading profile" />
  );
}

export default withAuth(MyProfile);
