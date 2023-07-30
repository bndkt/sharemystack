import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ProfilesList } from "@/components/profiles/ProfilesList";
import { useProfiles } from "@/hooks/data/useProfiles";

export default function UpdatedStacks() {
  const { profiles } = useProfiles({ updated: true });

  return (
    <CustomSuspense
      data={profiles}
      name="profiles"
      component={(loadedProfiles) => <ProfilesList profiles={loadedProfiles} />}
    />
  );
}
