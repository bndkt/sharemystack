import { ChevronRight } from "@tamagui/lucide-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { ListItem } from "tamagui";

import { List } from "@/components/list";
import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ProfileIcon } from "@/components/profiles/ProfileIcon";
import { useTool } from "@/hooks/data/useTool";

export function ToolStacks() {
  const { tool: slug } = useGlobalSearchParams<{ tool: string }>();
  const router = useRouter();

  const { picks } = useTool({ slug });

  if (!slug) return null;

  return (
    <List
      data={picks}
      renderItem={({ item }) => (
        <CustomSuspense
          promise={item.stack.fetch()}
          name="stack"
          component={(stack) => (
            <CustomSuspense
              promise={stack.profile.fetch()}
              name="stack"
              component={(profile) => (
                <ListItem
                  title={`${profile.name}`}
                  subTitle={`in their ${item.stackTypeName} stack`}
                  icon={<ProfileIcon profile={profile} />}
                  onPress={() => router.push(`/@${profile.slug}/${stack.id}`)}
                  iconAfter={<ChevronRight size="$1.5" />}
                />
              )}
            />
          )}
        />
      )}
    />
  );
}
