import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { FunctionComponent, ReactNode } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { ListItem, Separator, Text, getTokens, useTheme } from "tamagui";

import { SwipeableRow } from "./SwipeableRow";

export type GenerateRightActions<T> = (item: T) => {
  text: ReactNode;
  color: string;
  onPress: () => void;
}[];

export function List<T>({
  data,
  href,
  title,
  subTitle,
  icon,
  onPress,
  placeholder,
  iconAfter,
  generateRightActions,
  onRefresh,
  refreshing,
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
  generateRightActions?: GenerateRightActions<T>;
  onRefresh?: () => void;
  refreshing?: boolean;
}) {
  const theme = useTheme();
  const tokens = getTokens({ prefixed: false });

  placeholder ??= (
    <Text padding="$3" textAlign="center">
      No data
    </Text>
  );

  return data?.length ? (
    <FlashList
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={{ backgroundColor: theme.background.val }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing ?? false}
          onRefresh={onRefresh}
          style={{ backgroundColor: theme.background.val }}
          tintColor={tokens.color.sms.toString()}
        />
      }
      renderItem={({ item }) => {
        return (
          <SwipeableRow
            rightActions={
              generateRightActions ? generateRightActions(item) : undefined
            }
          >
            {href ? (
              <Link href={href(item)}>
                <ListItem
                  title={title(item)}
                  subTitle={subTitle && subTitle(item)}
                  icon={icon && icon(item)}
                  iconAfter={
                    iconAfter ? iconAfter(item) : <ChevronRight size="$1" />
                  }
                />
              </Link>
            ) : onPress ? (
              <ListItem
                title={title(item)}
                subTitle={subTitle && subTitle(item)}
                icon={icon && icon(item)}
                onPress={onPress ? () => onPress(item) : undefined}
                iconAfter={
                  iconAfter ? iconAfter(item) : <ChevronRight size="$1" />
                }
              />
            ) : (
              <ListItem
                title={title(item)}
                subTitle={subTitle && subTitle(item)}
                icon={icon && icon(item)}
                // iconAfter={iconAfter && iconAfter(item)}
              />
            )}
          </SwipeableRow>
        );
      }}
      estimatedItemSize={75}
      data={data}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  ) : (
    placeholder
  );
}
