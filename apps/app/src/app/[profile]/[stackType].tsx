import { useGlobalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { StackList } from "@/components/stacks/StackList";
import { useProfile } from "@/hooks/data/useProfile";

export default function StackType() {
  const {
    profile: profileSlug,
    stackType: stackTypeSlug,
    primaryStackTypeSlug,
  } = useGlobalSearchParams<{
    profile: string;
    stackType: string;
    primaryStackTypeSlug: string;
  }>();

  const { profile, stack, picks } = useProfile({
    slug: profileSlug?.toLowerCase().substring(1) ?? null, // "nickmilo", // TODO: Hardcoded for now
    stackTypeSlug: stackTypeSlug ?? primaryStackTypeSlug,
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
                <StackList profile={profile} stack={stack} picks={picks} />
              )}
            />
          )}
        />
      )}
    />
  );
}
