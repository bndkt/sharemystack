import { useLocalSearchParams } from "expo-router";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { StackList } from "@/components/stacks/StackList";
import { useProfile } from "@/hooks/data/useProfile";

export default function StackType() {
  const { profile: profileSlug, stackType: stackTypeSlug } =
    useLocalSearchParams<{
      profile: string;
      stackType: string;
    }>();

  const slug = "nickmilo"; // profileSlug ?? null;

  const { profile, stack, picks } = useProfile({
    slug, // "nickmilo", // TODO: Hardcoded for now
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
