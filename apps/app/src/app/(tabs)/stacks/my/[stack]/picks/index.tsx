import { ChevronRight } from "@tamagui/lucide-icons";
import {
  Link,
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { ListItem, Text, YStack } from "tamagui";

import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { List } from "@/components/list";
import { useProfile } from "@/hooks/data/useProfile";
import { useStackType } from "@/hooks/data/useStackType";
import { useAuth } from "@/hooks/useAuth";
import { CustomSuspense } from "@/components/loading/CustomSuspense";

export default function Index() {
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();
  console.log({ stackId });

  const { user } = useAuth();

  const { stack } = useProfile({ user, stackId });
  const { categories } = useStackType({ stack });

  return (
    <CustomSuspense
      data={stack}
      name="stack"
      component={(stack) => (
        <>
          <Stack.Screen
            options={{ title: `Categories (${stack?.stackTypeName})` }}
          />
          <YStack fullscreen minHeight={100}>
            <List
              data={categories}
              renderItem={({ item }) => {
                return item.isComingSoon ? null : (
                  <Link
                    href={`/(tabs)/stacks/my/${stack.id}/picks/${item.slug}`}
                  >
                    <ListItem
                      title={
                        item.isComingSoon ? (
                          <Text color="$gray8">{item.name}</Text>
                        ) : (
                          item.name
                        )
                      }
                      subTitle={
                        item.isComingSoon ? (
                          <Text color="$gray8">Coming soon</Text>
                        ) : (
                          `${item.numberOfTools ?? "0"} tool${
                            item.numberOfTools !== 1 ? "s" : ""
                          }`
                        )
                      }
                      icon={
                        <CategoryIcon
                          name={item.iconName}
                          color={item.isComingSoon ? "$gray8" : undefined}
                          size={"$1.5"}
                        />
                      }
                      iconAfter={<ChevronRight size="$1.5" />}
                    />
                  </Link>
                );
              }}
            />
          </YStack>
        </>
      )}
    />
  );
}
