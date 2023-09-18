import { YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { CreateProfile } from "@/components/my/CreateProfile";
import { MyProfileHeader } from "@/components/my/MyProfileHeader";
import { MyStacks } from "@/components/my/MyStacks";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { user } = useAuth();
  const { profile, stacks } = useProfile({ user, includeEmptyStacks: true });

  return profile ? (
    <YStack fullscreen>
      <CustomSuspense
        data={profile}
        name="profile"
        component={(profile) => (
          <>
            <MyProfileHeader profile={profile} />
            <CustomSuspense
              data={stacks}
              name="stacks"
              component={(stacks) => (
                <MyStacks profile={profile} stacks={stacks} />
              )}
            />
          </>
        )}
      />
    </YStack>
  ) : profile === null ? (
    <CreateProfile />
  ) : (
    <Loading message="Loading profile" />
  );
}
