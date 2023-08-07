import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ShareProfile } from "@/components/share/ShareProfile";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function ShareIndex() {
  const { user } = useAuth();
  const { profile, stacks } = useProfile({ user });

  return (
    <CustomSuspense
      data={profile}
      name="profile"
      component={(profile) => (
        <CustomSuspense
          data={stacks}
          name="stacks"
          component={(stacks) => (
            <ShareProfile profile={profile} stacks={stacks} />
          )}
        />
      )}
    />
  );
}
