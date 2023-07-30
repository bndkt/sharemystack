import { Slot } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { List } from "@/components/list";
import { useAuth } from "@/hooks/useAuth";
import { CreateProfile } from "@/components/my/CreateProfile";
import { MyProfileHeader } from "@/components/my/MyProfileHeader";
import { MyStacks } from "@/components/my/MyStacks";
import { CustomSuspense } from "@/components/loading/CustomSuspense";

export function MyProfile() {
  const { profile, stacks } = useAuth();

  return profile ? (
    <YStack fullscreen>
      <MyProfileHeader profile={profile} />
      <CustomSuspense
        data={stacks}
        name="stacks"
        component={(stacks) => <MyStacks profile={profile} stacks={stacks} />}
      />
      {/* <Slot /> */}
    </YStack>
  ) : profile === null ? (
    <CreateProfile />
  ) : (
    <Loading message="Loading profile" />
  );
}

export default withAuth(MyProfile);
