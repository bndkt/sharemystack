import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { FunctionComponent, ReactNode } from "react";
import { ListItem, Separator, Text } from "tamagui";

export function List<T>({
  data,
  href,
  title,
  subTitle,
  icon,
  onPress,
  placeholder,
  iconAfter,
}: {
  data: readonly T[] | null;
  href?: (item: T) => string;
  title: (item: T) => ReactNode;
  subTitle?: (item: T) => ReactNode;
  icon?: (
    item: T
  ) =>
    | JSX.Element
    | FunctionComponent<{ color?: string; size?: number }>
    | null;
  onPress?: (item: T) => void;
  placeholder?: JSX.Element;
  iconAfter?: (item: T) => JSX.Element | undefined;
}) {
  placeholder ??= (
    <Text padding="$3" textAlign="center">
      No data
    </Text>
  );

  return data && data.length ? (
    <FlashList
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item }) => {
        return href ? (
          <Link href={href(item)}>
            <ListItem
              title={title(item)}
              subTitle={subTitle && subTitle(item)}
              icon={icon && icon(item)}
              iconAfter={iconAfter ? iconAfter(item) : ChevronRight}
            />
          </Link>
        ) : onPress ? (
          <ListItem
            title={title(item)}
            subTitle={subTitle && subTitle(item)}
            icon={icon && icon(item)}
            onPress={onPress ? () => onPress(item) : undefined}
            iconAfter={iconAfter ? iconAfter(item) : ChevronRight}
          />
        ) : (
          <ListItem
            title={title(item)}
            subTitle={subTitle && subTitle(item)}
            icon={icon && icon(item)}
            iconAfter={iconAfter && iconAfter(item)}
          />
        );
      }}
      estimatedItemSize={data.length}
      data={data}
    />
  ) : (
    placeholder
  );
}
