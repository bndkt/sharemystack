import { YStack } from "tamagui";

import { ToolListItem } from "./ToolListItem";

import { List } from "@/components/list";
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
          <ToolListItem category={category} tool={item} compact={compact} />
        )}
      />
    </YStack>
  );
}
