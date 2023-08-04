import { useGlobalSearchParams } from "expo-router";
import { Text } from "tamagui";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { PicksList } from "@/components/picks/PicksList";
import { useProfile } from "@/hooks/data/useProfile";

export default function StackType() {
  let {
    profile: profileSlug,
    stack: stackId,
    primaryStackId,
  } = useGlobalSearchParams<{
    profile: string;
    stack: string;
    primaryStackId: string;
  }>();

  stackId ??= primaryStackId;

  const { profile, stack, picks } = useProfile({
    slug: profileSlug?.toLowerCase().substring(1) ?? null,
    stackId,
  });

  return stackId && stackId !== "undefined" ? (
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
  ) : (
    <Text textAlign="center" padding="$3">
      This user has not created any stacks yet.
    </Text>
  );
}
