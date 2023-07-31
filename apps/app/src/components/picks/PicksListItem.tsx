import { Trash2 } from "@tamagui/lucide-icons";
import { ListItem } from "tamagui";

import { SwipeableRow } from "../list/SwipeableRow";
import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";
import { Stack } from "@/model/Stack";

export function PicksListItem({ stack, pick }: { stack: Stack; pick: Pick }) {
  return (
    <SwipeableRow
      rightActions={[
        {
          text: <Trash2 color="white" />,
          color: "$red10",
          onPress: () => {
            stack?.removePick(pick);
          },
        },
      ]}
    >
      <ListItem
        title={pick.toolName}
        subTitle={pick.categoryName}
        icon={
          <CustomSuspense
            promise={pick.tool.fetch()}
            name="tool"
            component={(tool) => <ToolIcon tool={tool} size="$3" />}
          />
        }
      />
    </SwipeableRow>
  );
}
