import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { MyStacks } from "@/components/my/MyStacks";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { profile, stacks } = useAuth();

  return (
    <CustomSuspense
      data={profile}
      name="profile"
      component={(profile) => (
        <CustomSuspense
          data={stacks}
          name="stacks"
          component={(stacks) => <MyStacks profile={profile} stacks={stacks} />}
        />
      )}
    />
  );
}
