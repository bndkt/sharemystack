import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, Text, YStack } from "tamagui";

import { CategoryIcon } from "@/components/categories/CategoryIcon";
import { List } from "@/components/list";
import { useObservableCategories } from "@/hooks/useObservableCategories";

export default function Index() {
  const categories = useObservableCategories();

  return (
    <YStack fullscreen minHeight={100}>
      <List
        data={categories}
        renderItem={({ item }) => {
          return (
            <Link href={`/(tabs)/stacks/my/picks/${item.slug}`}>
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
                    name={item.icon}
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
  );
}
