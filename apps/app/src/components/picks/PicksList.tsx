// import { ChevronRight } from "@tamagui/lucide-icons";
// import { useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { List } from "../list";
import { CustomSuspense } from "../loading/CustomSuspense";
import { ToolIcon } from "../tools/ToolIcon";

import { Pick } from "@/model/Pick";
import { Profile } from "@/model/Profile";
import { Stack } from "@/model/Stack";

export function PicksList({
  profile,
  stack,
  picks,
}: {
  profile: Profile;
  stack: Stack;
  picks: Pick[];
}) {
  // const router = useRouter();

  return (
    <List
      data={picks}
      renderItem={({ item }) => (
        <CustomSuspense
          promise={item.tool.fetch()}
          name="tool"
          component={(tool) => (
            <ListItem
              title={item.toolName}
              subTitle={item.categoryName}
              icon={<ToolIcon tool={tool} size="$1.5" />}
              /* iconAfter={<ChevronRight size="$1.5" />}
              onPress={() => {
                router.push(
                  `/(tabs)/categories/${item.categorySlug}/tools/${tool.slug}`
                );
              }} */
            />
          )}
        />
      )}
    />
  );
}
