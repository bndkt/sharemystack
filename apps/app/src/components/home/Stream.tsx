import { Layers } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { List } from "../list";
import { usePicks } from "@/hooks/data/usePicks";
import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

export function Stream() {
  const { picks } = usePicks();
  const router = useRouter();

  return (
    <List
      data={picks}
      renderItem={({ item }) => {
        return (
          <ListItem
            title={`${item.profileName} (@${item.profileSlug})`}
            subTitle={`added ${item.toolName} in ${item.categoryName}`}
            onPress={() =>
              router.push(`/@${item.profileSlug}/${item.stackTypeSlug}`)
            }
            iconAfter={<Layers size="$1.5" />}
            icon={
              <CustomSuspense
                promise={item.tool.fetch()}
                name="tool"
                component={(tool) => <ToolIcon tool={tool} size="$1.5" />}
              />
            }
          />
        );
      }}
    />
  );
}
