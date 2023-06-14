import { useEffect, useState } from "react";
import { Spinner } from "tamagui";

import { ToolsResponse, getTools } from "../../../lib/database/getTools";
import { ToolList } from "../../../components/tools/ToolList";

export default function Tools() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<ToolsResponse["data"]>(null);

  useEffect(() => {
    getTools().then(({ data }) => {
      setTools(data);
      setLoading(false);
    });
  }, [getTools, setTools]);

  return isLoading ? <Spinner /> : <ToolList tools={tools} />;
}

/* 
import { FlashList } from "@shopify/flash-list";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ListItem, Separator, Spinner, YStack } from "tamagui";

import { SuggestionButton } from "../../../components/SuggestionButton";
import { ToolIcon } from "../../../components/icons/ToolIcon";
import { supabase } from "../../../lib/supabase";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [tools, setTools] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website: string | null;
      color?: string | null;
      icon?: string | null;
    }[]
  >([]);

  const getTools = async () => {
    try {
      const { data } = await supabase
        .from("tools")
        .select("id, name, slug, color, icon, website")
        .order("name");
      data && setTools(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTools();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <YStack fullscreen>
        <FlashList
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item }) => {
            return (
              <Link href={`/tools/${item.slug}`}>
                <ListItem
                  icon={
                    <ToolIcon
                      svgXml={item.icon}
                      color={item.color}
                      width="24"
                      height="24"
                    />
                  }
                  title={item.name}
                  subTitle={item.website}
                  iconAfter={ChevronRight}
                />
              </Link>
            );
          }}
          estimatedItemSize={tools.length}
          data={tools}
        />
        <SuggestionButton />
      </YStack>
    </>
  );
}

*/
