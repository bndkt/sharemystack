import { Stack } from "expo-router";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { CreateProfile } from "@/components/my/CreateProfile";
import { useAuth } from "@/hooks/useAuth";

export function MyProfile() {
  const { profile } = useAuth();

  return profile ? (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Stacks" }} />
      <Stack.Screen
        name="[stack]"
        options={{
          title: "Stack",
        }}
      />
    </Stack>
  ) : profile === null ? (
    <CreateProfile />
  ) : (
    <Loading message="Loading profile" />
  );
}

export default withAuth(MyProfile);
