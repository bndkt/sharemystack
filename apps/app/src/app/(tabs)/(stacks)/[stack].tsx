import { Stack, useLocalSearchParams } from "expo-router";
import { Button, H3, H4, Separator, Text, XStack, YStack } from "tamagui";
import { Image } from "expo-image";
import * as Linking from "expo-linking";

import { List } from "@/components/list";
import { StackHeaderRight } from "@/components/stacks/StackHeaderRight";
import { StackPick } from "@/components/stacks/StackPick";
import { useObservableStack } from "@/hooks/useObservableStack";
import { Globe, Twitter, Youtube } from "@tamagui/lucide-icons";

export default function Index() {
  let { stack: slug } = useLocalSearchParams<{ stack: string }>();
  slug = slug?.toLowerCase().substring(1);

  if (!slug) throw new Error("Stack not found");

  const { stack, picks } = useObservableStack({
    slug,
    loadPicks: true,
  });

  const imageUrl = stack?.image
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/stack-images/creators/${stack.image}`
    : undefined;

  return stack ? (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          // headerTitle: (props) => <StackHeader stack={stack} />,
          // headerBackVisible: true,
          headerRight: () => <StackHeaderRight stack={stack} />,
          // header: (props) => <StackHeader stack={stack} />,
        }}
      />
      <YStack fullscreen>
        <YStack
          paddingBottom="$3"
          borderBottomColor="$borderColor"
          borderBottomWidth="$1"
        >
          {imageUrl && (
            <Image
              // style={styles.image}
              source={imageUrl}
              // placeholder={blurhash}
              contentFit="cover"
              transition={1000}
              style={{ width: "100%", height: 200 }}
            />
          )}
          <YStack paddingHorizontal="$3" marginTop="$3">
            <H3>{stack.name}</H3>
            <H4>@{stack.slug}</H4>
          </YStack>
          {stack.description && (
            <Text marginTop="$3" paddingHorizontal="$3" fontSize="$5">
              {stack.description}
            </Text>
          )}
          {(stack.website || stack.twitter || stack.youtube) && (
            <XStack marginTop="$3">
              {stack.website && (
                <Button
                  onPress={() => Linking.openURL(stack.website)}
                  icon={<Globe size="$1.5" />}
                  unstyled
                  marginLeft="$3"
                />
              )}
              {stack.twitter && (
                <Button
                  onPress={() => Linking.openURL(stack.twitter)}
                  icon={<Twitter size="$1.5" color="#1DA1F2" />}
                  unstyled
                  marginLeft="$3"
                />
              )}
              {stack.youtube && (
                <Button
                  onPress={() => Linking.openURL(stack.youtube)}
                  icon={<Youtube size="$1.5" color="#FF0000" />}
                  unstyled
                  marginLeft="$3"
                />
              )}
            </XStack>
          )}
        </YStack>
        <List
          data={picks}
          renderItem={({ item }) => <StackPick pick={item} />}
        />
      </YStack>
    </>
  ) : null;
}
