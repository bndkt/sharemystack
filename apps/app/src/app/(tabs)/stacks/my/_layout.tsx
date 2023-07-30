import { Slot, Stack } from "expo-router";
import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { CreateProfile } from "@/components/my/CreateProfile";
import { MyProfileHeader } from "@/components/my/MyProfileHeader";
import { MyStacks } from "@/components/my/MyStacks";
import { useAuth } from "@/hooks/useAuth";

export function MyProfile() {
  const { profile, stacks } = useAuth();

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
