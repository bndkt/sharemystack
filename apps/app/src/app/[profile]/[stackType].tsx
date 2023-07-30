import { useLocalSearchParams } from "expo-router";
import { Text } from "tamagui";

export default function StackType() {
  const { stackType: slug } = useLocalSearchParams<{ stackType: string }>();

  return <Text>StackType: {slug}</Text>;
}
