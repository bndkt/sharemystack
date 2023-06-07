import { View, Text } from "react-native";
import { useEffect } from "react";

import { supabase } from "../lib/supabase";

export default function Index() {
  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, name")
      .then(({ data, error }) => {
        console.log({ data, error });
      });
  });

  return (
    <View>
      <Text>Profiles</Text>
    </View>
  );
}
