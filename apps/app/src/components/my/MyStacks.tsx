import { ChevronRight, Plus } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { H5, ListItem, Text } from "tamagui";

import { CategoryIcon } from "../categories/CategoryIcon";
import { List } from "../list";

import { useStackTypes } from "@/hooks/data/useStackTypes";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { StackType } from "@/model/StackType";

export function MyStacks({
  profile,
  stacks,
}: {
  profile: Profile;
  stacks: Stack[];
}) {
  const { stackTypes } = useStackTypes();
  const router = useRouter();

  async function handleCreateStack(stackType: StackType) {
    console.log("Create stack", stackType.name);
    await profile.addStack(stackType);
  }

  const filteredStackTypes =
    stackTypes?.filter(
      (stackType) =>
        !stacks.some((stack) => stack.stackTypeSlug === stackType.slug)
    ) ?? [];

  const items: (
    | string
    | (() => React.JSX.Element)
    | Stack
    | StackType
    | undefined
  )[] = [
    "My stacks",
    ...stacks,
    stacks.length === 0
      ? () => <ListItem title="You have not created any stacks yet" />
      : undefined,
    stacks.length > 0
      ? "Add a new stack to your profile"
      : "Create your first stack now",
    ...filteredStackTypes,
  ];

  return (
    <List
      data={items}
      renderItem={({ item }) => {
        if (typeof item === "string") {
          return (
            <H5 paddingHorizontal="$3" paddingVertical="$3">
              {item}
            </H5>
          );
        } else if (typeof item === "function") {
          return item();
        } else if (item instanceof StackType) {
          return (
            <ListItem
              onPress={
                item.isComingSoon ? undefined : () => handleCreateStack(item)
              }
              title={
                <Text color={item.isComingSoon ? "$gray10" : undefined}>
                  {item.name} {item.isComingSoon && " (coming soon)"}
                </Text>
              }
              icon={
                <CategoryIcon
                  name={item.iconName}
                  size="$1.5"
                  color={item.isComingSoon ? "$gray10" : undefined}
                />
              }
              iconAfter={
                <Plus
                  size="$1.5"
                  color={item.isComingSoon ? "$gray10" : undefined}
                />
              }
            />
          );
        } else if (item instanceof Stack) {
          return (
            <ListItem
              onPress={() => router.push(`/stacks/my/${item.id}`)}
              title={item.stackTypeName}
              icon={<CategoryIcon name={item.stackTypeIconName} size="$1.5" />}
              iconAfter={<ChevronRight size="$1.5" />}
            />
          );
        } else {
          return <></>;
        }
      }}
    />
  );
}
