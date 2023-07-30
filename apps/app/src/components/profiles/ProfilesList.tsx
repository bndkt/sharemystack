import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { ListItem, YStack } from "tamagui";

import { ProfileIcon } from "./ProfileIcon";

import { List } from "@/components/list";
import { Profile } from "@/model/Profile";

export function ProfilesList({
  profiles,
  placeholder,
}: {
  profiles: Profile[];
  placeholder?: string;
}) {
  return (
    <YStack fullscreen>
      <List
        data={profiles}
        placeholder={placeholder}
        renderItem={({ item }) => {
          return (
            <Link href={`/@${item.slug}`}>
              <ListItem
                title={item.name}
                subTitle={`@${item.slug}`}
                icon={<ProfileIcon profile={item} />}
                iconAfter={<ChevronRight size="$1.5" />}
              />
            </Link>
          );
        }}
      />
    </YStack>
  );
}
