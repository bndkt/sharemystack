import { Pick } from "@/model/Pick";
import { ListItem } from "tamagui";
import { ToolIcon } from "../tools/ToolIcon";
import { CustomSuspense } from "../loading/CustomSuspense";
import { SwipeableRow } from "../list/SwipeableRow";
import { Trash2 } from "@tamagui/lucide-icons";
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
