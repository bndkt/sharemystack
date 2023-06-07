import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { supabase } from "../../lib/supabase";

export default function Index() {
  const { tool: slug } = useLocalSearchParams();

  const [isLoading, setLoading] = useState(true);
  const [tool, setTool] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website: string;
      color?: string;
    }[]
  >([]);

  const getTool = async () => {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website");
      setTool(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTool();
  }, []);

  // Color
  // Icon
  // Users
  // Category
  return (
    <View>
      <Text>Tool: {slug}</Text>
    </View>
  );
}
