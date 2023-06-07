import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ListItem, Spinner, Stack } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";

import { supabase } from "../../lib/supabase";
import { Link } from "expo-router";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website: string;
      color?: string;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data, error } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website");
      setTools(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTools();
  }, []);

  return (
    <Stack>
      <Text>Tools</Text>

      {isLoading ? (
        <Spinner />
      ) : (
        <View style={{ height: 500 }}>
          <FlashList
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => {
              return (
                <Link href={`/tools/${item.slug}`}>
                  <ListItem
                    icon={<Plus color={item.color ?? "#000000"} />}
                    title={item.name}
                    subTitle={item.website}
                  />
                </Link>
              );
            }}
            estimatedItemSize={tools.length}
            data={tools}
          />
        </View>
      )}
    </Stack>
  );
}
