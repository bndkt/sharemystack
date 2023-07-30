import { Stack, useLocalSearchParams } from "expo-router";

import { useProfile } from "@/hooks/data/useProfile";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ProfileView } from "@/components/profiles/ProfileView";
import { MaterialTopTabs } from "@/components/MaterialTopTabs";
import { Text, YStack } from "tamagui";
import { StacksTabBar } from "@/components/stacks/StacksTabBar";

export default function Profile() {
  let { profile: slug } = useLocalSearchParams<{ profile: string }>();
  slug = slug?.toLowerCase().substring(1);

  if (!slug) throw new Error("No profile handle provided");

  const { profile, stacks } = useProfile({ slug });

  const title = profile ? `${profile.name} (@${profile.slug})` : "";

  return (
    <YStack fullscreen>
      <Stack.Screen options={{ title }} />
      <CustomSuspense
        data={profile}
        name="profile"
        component={(profile) => <ProfileView profile={profile} />}
      />
      <MaterialTopTabs
        tabBar={(props) => (
          <StacksTabBar tabBarProps={props} profile={profile} stacks={stacks} />
        )}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Index" }} />
        <MaterialTopTabs.Screen
          name="[stackType]"
          options={{ title: "Stack Type" }}
        />
      </MaterialTopTabs>
    </YStack>
  );
}
