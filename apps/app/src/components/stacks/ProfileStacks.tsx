import { Stack } from "@/model/Stack";
import { List } from "../list";
import { ListItem } from "tamagui";
import { CategoryIcon } from "../categories/CategoryIcon";
import { useRouter } from "expo-router";
import { Profile } from "@/model/Profile";

export function ProfileStacks({
  profile,
  stacks,
}: {
  profile: Profile;
  stacks: Stack[];
}) {
  const router = useRouter();

  return (
    <List
      data={stacks}
      renderItem={({ item }) => (
        <ListItem
          title={item.stackTypeName}
          icon={<CategoryIcon name={item.stackTypeIconName} />}
          onPress={() =>
            router.push(`(tabs)/(stacks)/${profile.slug}/${item.stackTypeSlug}`)
          }
        />
      )}
    />
  );
}
