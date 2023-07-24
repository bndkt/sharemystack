import BottomSheet from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { useTheme } from "tamagui";

import { CloseBottomSheet } from "@/components/myStack/CloseBottomSheet";

export default function Layout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const router = useRouter();

  const snapPoints = useMemo(() => ["50%"], []); // "25%", "50%", "75%"

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      onClose={() => router.push("/(tabs)/(stacks)/stacks/my/tmp")}
      style={{
        shadowColor: theme.color.val,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: theme.background.val,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.color.val,
      }}
      handleStyle={{
        backgroundColor: theme.background.val,
      }}
      backgroundStyle={{ backgroundColor: theme.background.val }}
    >
      <Stack screenOptions={{ headerRight: () => <CloseBottomSheet /> }}>
        <Stack.Screen name="index" options={{ title: "Categories" }} />
        <Stack.Screen name="[category]" options={{ title: "Tools" }} />
      </Stack>
    </BottomSheet>
  );
}
