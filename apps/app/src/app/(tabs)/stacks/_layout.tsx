import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialTopTabs } from "@/components/MaterialTopTabs";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <MaterialTopTabs style={{ paddingTop: insets.top }}>
      <MaterialTopTabs.Screen name="index" options={{ title: "Featured" }} />
      <MaterialTopTabs.Screen name="updated" options={{ title: "Updated" }} />
      <MaterialTopTabs.Screen name="starred" options={{ title: "Starred" }} />
      <MaterialTopTabs.Screen name="my" options={{ title: "My Stacks" }} />
    </MaterialTopTabs>
  );
}
