import { useLocalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { StackList } from "@/components/stacks/StackList";
import { useProfile } from "@/hooks/data/useProfile";

export default function StackType() {
  const { stackType: stackTypeSlug } = useLocalSearchParams<{
    stackType: string;
  }>();

  // if (!slug) throw new Error("No profile provided");

  const { profile, stack, picks } = useProfile({
    slug: "nickmilo",
    stackTypeSlug,
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
