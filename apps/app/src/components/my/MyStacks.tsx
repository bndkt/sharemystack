import { withObservables } from "@nozbe/watermelondb/react";
import { Plus } from "@tamagui/lucide-icons";
import { H5, ListItem, Text } from "tamagui";

import { StacksListItem } from "./StacksListItem";
import { CategoryIcon } from "../categories/CategoryIcon";
import { List } from "../list";

import { useStackTypes } from "@/hooks/data/useStackTypes";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";
import { StackType } from "@/model/StackType";

export function MyStacksBase({
  profile,
  stacks,
}: {
  profile: Profile;
  stacks: Stack[];
}) {
  const { stackTypes } = useStackTypes();
  const { capture, addTag, addTrigger } = useAnalytics();

  async function handleCreateStack(stackType: StackType) {
    await profile.addStack(stackType);
    capture("stack_created", {
      type: stackType.slug,
    });
    addTag("stack_created", "now()");
    addTrigger("stack_created", "true");
  }

  const filteredStackTypes =
    stackTypes?.filter(
      (stackType) =>
        !stacks.some((stack) => stack.stackTypeSlug === stackType.slug),
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
      extraData={profile}
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
          return <StacksListItem stack={item} profile={profile} />;
        } else {
          return <></>;
        }
      }}
    />
  );
}

const enhance = withObservables(["profile"], ({ profile }) => ({
  profile,
}));

export const MyStacks = enhance(MyStacksBase);
