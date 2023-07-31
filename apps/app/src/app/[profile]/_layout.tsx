import { Stack, useLocalSearchParams } from "expo-router";
import { YStack } from "tamagui";

import { MaterialTopTabs } from "@/components/MaterialTopTabs";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ProfileView } from "@/components/profiles/ProfileView";
import { StacksTabBar } from "@/components/stacks/StacksTabBar";
import { useProfile } from "@/hooks/data/useProfile";

export default function Profile() {
  let { profile: slug } = useLocalSearchParams<{ profile: string }>();
  slug = slug?.toLowerCase().substring(1);

  if (!slug) throw new Error("No profile provided");

  const { profile, stacks } = useProfile({ slug });

  return (
    <CustomSuspense
      data={profile}
      name="profile"
      component={(profile) => (
        <YStack fullscreen>
          <Stack.Screen
            options={{ title: `${profile.name} (@${profile.slug})` }}
          />
          <ProfileView profile={profile} />
          <MaterialTopTabs
            tabBar={(props) => (
              <CustomSuspense
                data={stacks}
                name="stacks"
                component={(stacks) => (
                  <StacksTabBar
                    tabBarProps={props}
                    profile={profile}
                    stacks={stacks}
                  />
                )}
              />
            )}
          >
            <MaterialTopTabs.Screen
              name="[stackType]"
              options={{ title: "Stack Type" }}
            />
          </MaterialTopTabs>
        </YStack>
      )}
    />
  );
}
