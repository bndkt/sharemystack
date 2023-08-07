import { YStack } from "tamagui";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { MyProfileHeader } from "@/components/my/MyProfileHeader";
import { MyStacks } from "@/components/my/MyStacks";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { profile, stacks } = useAuth();

  return (
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
  );
}
