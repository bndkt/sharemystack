import { Text } from "tamagui";

export function ToolContent({ content }: { content: any }) {
  if (Object.keys(content).length === 0) {
    return <Text textAlign="center">More content is coming soon.</Text>;
  }

  return <Text>{content.description}</Text>;
}
