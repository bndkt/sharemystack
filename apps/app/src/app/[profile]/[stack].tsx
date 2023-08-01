import { useGlobalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { PicksList } from "@/components/picks/PicksList";
import { useProfile } from "@/hooks/data/useProfile";

export default function StackType() {
  const {
    profile: profileSlug,
    stack: stackId,
    primaryStackId,
  } = useGlobalSearchParams<{
    profile: string;
    stack: string;
    primaryStackId: string;
  }>();

  const { profile, stack, picks } = useProfile({
    slug: profileSlug?.toLowerCase().substring(1) ?? null,
    stackId: stackId ?? primaryStackId,
  });

  return (
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
                <PicksList profile={profile} stack={stack} picks={picks} />
              )}
            />
          )}
        />
      )}
    />
  );
}
