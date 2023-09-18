import { ListItem, Text, YStack } from "tamagui";

import { List } from "../list";
import { ToolIcon } from "../tools/ToolIcon";

import { useTools } from "@/hooks/data/useTools";

export function NewTools() {
  const { tools } = useTools({ recentlyAdded: true, limit: 16 });

  return (
    <YStack flexGrow={1}>
      <Text
        backgroundColor="$sms"
        color="$background"
        paddingVertical="$3"
        paddingHorizontal="$3"
        fontWeight="bold"
      >
        Recently added tools
      </Text>
      <YStack flex={1}>
        <List
          data={tools}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                title={`${item.name}`}
                // subTitle={`added ${item.toolName} to their ${item.stackTypeName} stack`}

                icon={<ToolIcon tool={item} size="$1.5" />}
              />
            );
          }}
        />
      </YStack>
    </YStack>
  );
}
