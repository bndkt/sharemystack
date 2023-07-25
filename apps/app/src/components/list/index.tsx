import { FlashList, ListRenderItem } from "@shopify/flash-list";
// import { RefreshControl } from "react-native-gesture-handler";
import { Separator, Text } from "tamagui";

import { useSync } from "@/hooks/useSync";
import { useEffect, useState } from "react";

export function List<T>({
  data,
  renderItem,
  placeholder,
}: {
  data?: readonly T[] | null;
  renderItem?: ListRenderItem<T> | null;
  placeholder?: JSX.Element | string;
}) {
  const { sync, isSyncing } = useSync();
  const [isRefreshing, setIsRefreshing] = useState(false);

  placeholder ??= "No data";
  if (typeof placeholder === "string") {
    placeholder = (
      <Text padding="$3" textAlign="center">
        {placeholder}
      </Text>
    );
  }

  function refresh() {
    setIsRefreshing(true);
    sync();
  }

  useEffect(() => {
    if (!isSyncing) {
      setIsRefreshing(false);
    }
  }, [isSyncing]);

  return (
    <FlashList
      ListEmptyComponent={placeholder}
      data={data}
      renderItem={renderItem}
      estimatedItemSize={87}
      ItemSeparatorComponent={() => <Separator />}
      onRefresh={refresh}
      refreshing={isRefreshing}
      /* refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      } */
    />
  );
}
