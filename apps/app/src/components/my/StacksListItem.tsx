import { ChevronRight, Star } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { CategoryIcon } from "../categories/CategoryIcon";
import { SwipeableRow } from "../list/SwipeableRow";

import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function StacksListItem({
  stack,
  profile,
}: {
  stack: Stack;
  profile: Profile;
}) {
  const router = useRouter();

  return (
    <SwipeableRow
      rightActions={[
        /* {
          text: <Trash2 color="white" />,
          color: "$red10",
          onPress: () => {
            // stack?.removePick(pick);
          },
        }, */
        {
          text: <Star color="white" />,
          color: "$yellow10",
          onPress: () => {
            profile.primaryStack(stack.id);
          },
        },
      ]}
    >
      <ListItem
        onPress={() => router.push(`/my/${stack.id}`)}
        title={stack.stackTypeName}
        icon={
          stack.id === profile.primaryStackId ? (
            <Star size="$1.5" color="$yellow10" />
          ) : (
            <CategoryIcon name={stack.stackTypeIconName} size="$1.5" />
          )
        }
        iconAfter={<ChevronRight size="$1.5" />}
      />
    </SwipeableRow>
  );
}
