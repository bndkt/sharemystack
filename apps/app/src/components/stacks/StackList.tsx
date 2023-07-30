import { ListItem } from "tamagui";

import { List } from "../list";
import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function StackList({
  profile,
  stack,
  picks,
}: {
  profile: Profile;
  stack: Stack;
  picks: Pick[];
}) {
  return (
    <List
      data={picks}
      renderItem={({ item }) => (
        <ListItem
          title={item.toolName}
          subTitle={item.categoryName}
          icon={
            <CustomSuspense
              promise={item.tool.fetch()}
              name="tool"
              component={(tool) => <ToolIcon tool={tool} size="$1.5" />}
            />
          }
        />
      )}
    />
  );
}
