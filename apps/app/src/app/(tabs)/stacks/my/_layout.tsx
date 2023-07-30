import { Slot } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { List } from "@/components/list";
import { useAuth } from "@/hooks/useAuth";
import { CreateProfile } from "@/components/profiles/CreateProfile";
import { MyProfileHeader } from "@/components/profiles/MyProfileHeader";

export function MyStack() {
  const { profile, stacks } = useAuth();

  return profile ? (
    <YStack fullscreen>
      <MyProfileHeader profile={profile} />
      <List
        data={stacks}
        placeholder="You have not added any stacks to your profile yet."
        renderItem={({ item }) => <ListItem title={item.id} />}
      />
      {/* <Slot /> */}
    </YStack>
  ) : profile === null ? (
    <CreateProfile />
  ) : (
    <Loading message="Loading profile" />
  );
}

export default withAuth(MyStack);
