import { useLocalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ShareStack } from "@/components/share/ShareStack";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function ShareStackRoute() {
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();

  const { user } = useAuth();
  const { profile, stack, picks } = useProfile({ user, stackId });

  return (
    <>
      <CustomSuspense
        data={profile}
        name="profile"
        component={(profile) => (
          <CustomSuspense
            data={stack}
            name="stack"
            component={(stack) => (
              <CustomSuspense
                data={picks}
                name="picks"
                component={(picks) => (
                  <ShareStack profile={profile} stack={stack} picks={picks} />
                )}
              />
            )}
          />
        )}
      />
    </>
  );
}
