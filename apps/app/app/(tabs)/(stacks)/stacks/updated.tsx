import { useEffect, useState } from "react";
import { Spinner, YStack } from "tamagui";

import { supabase } from "../../../../lib/supabase";
import { List } from "../../../../components/List";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<
    {
      id: string;
      name: string;
      slug: string;
      website?: string;
      twitter?: string;
    }[]
  >([]);

  const getStacks = async () => {
    try {
      const { data, error } = await supabase
        .from("stacks")
        .select("id, name, slug, website, twitter")
        .eq("featured", true)
        .order("name");
      console.log(data, error);
      setStacks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStacks();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <YStack fullscreen>
        <List
          data={stacks}
          href={(item) => `/(stacks)/@${item.slug}`}
          title={(item) => item.name}
          subTitle={(item) => item.website}
        />
      </YStack>
    </>
  );
}
