import { MaterialTopTabs } from "@/components/MaterialTopTabs";

export default function Layout() {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name="index" options={{ title: "Featured" }} />
      <MaterialTopTabs.Screen name="updated" options={{ title: "Updated" }} />
      <MaterialTopTabs.Screen name="starred" options={{ title: "Starred" }} />
      <MaterialTopTabs.Screen name="my" options={{ title: "My Stack" }} />
    </MaterialTopTabs>
  );
}
