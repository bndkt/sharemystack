import { Stack } from "expo-router";

import { withAuth } from "@/components/auth/withAuth";

export function MyProfile() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="[stack]"
        options={{
          title: "Stack",
        }}
      />
      <Stack.Screen
        name="share"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

export default withAuth(MyProfile, true);
