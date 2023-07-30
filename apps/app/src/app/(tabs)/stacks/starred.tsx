import { withAuth } from "@/components/auth/withAuth";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ProfilesList } from "@/components/profiles/ProfilesList";

import { useProfiles } from "@/hooks/data/useProfiles";

function StarredStacks() {
  const { profiles } = useProfiles({ starred: true });

  return (
    <CustomSuspense
      data={profiles}
      name="profiles"
      component={(loadedProfiles) => <ProfilesList profiles={loadedProfiles} />}
    />
  );
}

export default withAuth(StarredStacks);
