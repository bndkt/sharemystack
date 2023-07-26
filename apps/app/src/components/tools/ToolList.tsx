import { YStack } from "tamagui";

import { List } from "@/components/list";
import { PickTool } from "@/components/tools/PickTool";
import { Category } from "@/model/Category";
import { Tool } from "@/model/Tool";

export function ToolList({
  category,
  tools,
  compact,
}: {
  category: Category;
  tools?: Tool[];
  compact?: boolean;
}) {
  return (
    <YStack fullscreen minHeight={100}>
      <List
        data={tools}
        renderItem={({ item }) => (
          <PickTool category={category} item={item} compact={compact} />
        )}
      />
    </YStack>
  );
}
