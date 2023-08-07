import { useTheme } from "@tamagui/core";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ShareView } from "@/components/share/ShareView";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function ShareRoute() {
  const theme = useTheme();
  const router = useRouter();
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();

  const { user } = useAuth();
  const { profile, stack, picks } = useProfile({ user, stackId });

  return (
    <>
      <Stack.Screen options={{ presentation: "modal" }} />

      <CustomSuspense
        data={profile}
        name="profile"
        component={(profile) => (
          <CustomSuspense
            data={picks}
            name="picks"
            component={(picks) => (
              <CustomSuspense
                data={stack}
                name="stack"
                component={(stack) => (
                  <ShareView profile={profile} stack={stack} picks={picks} />
                )}
              />
            )}
          />
        )}
      />
    </>
  );
}
