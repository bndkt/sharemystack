import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

import { useAuth } from "@/hooks/useAuth";
import { useSync } from "@/hooks/useSync";
import { supabase } from "@/lib/supabase";
import { isValidSlug } from "@/lib/validation";

export function CreateStack() {
  const { user } = useAuth();
  const [name, setName] = useState<string | null | undefined>(
    user?.user_metadata.full_name
  );
  const [slug, setSlug] = useState<string | null | undefined>(
    user?.user_metadata.preferred_username
  );
  const [validate, setValidate] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const slugRef = useRef<TextInput>(null);
  const { sync } = useSync();

  async function createStack() {
    nameRef.current?.blur();
    slugRef.current?.blur();
    setValidate(true);
    if (user && name && slug) {
      supabase
        .from("stacks")
        .insert({
          name,
          slug,
          twitter: user.user_metadata.preferred_username,
          twitter_image_url: user.user_metadata.avatar_url,
          user_id: user.id,
        })
        .then(() => {
          sync();
        });
    }
  }

  return (
    <YStack padding="$3">
      <Text marginBottom="$3" textAlign="center">
        You haven’t created your profile. Let’s do that now.
      </Text>
      <YStack>
        <XStack alignItems="center">
          <Input
            value={name ?? ""}
            onChangeText={(text) => setName(text)}
            borderBottomStartRadius={0}
            borderBottomEndRadius={0}
            flexGrow={1}
            placeholder="Name"
            borderColor={validate && !name ? "$red10" : undefined}
            borderBottomColor={
              validate && (!name || !isValidSlug(slug)) ? "$red10" : undefined
            }
            ref={nameRef}
            onFocus={() => setValidate(false)}
          />
        </XStack>
        <XStack alignItems="center">
          <Input
            value="@"
            borderTopWidth={0}
            borderTopStartRadius={0}
            borderTopEndRadius={0}
            borderRightWidth={0}
            borderBottomEndRadius={0}
            editable={false}
            paddingRight={0}
            borderColor={validate && !isValidSlug(slug) ? "$red10" : undefined}
          />
          <Input
            value={slug ?? ""}
            onChangeText={(text) =>
              (!text || isValidSlug(text, true)) && setSlug(text.toLowerCase())
            }
            borderLeftWidth={0}
            borderTopWidth={0}
            borderTopStartRadius={0}
            borderTopEndRadius={0}
            borderBottomStartRadius={0}
            paddingLeft={0}
            flexGrow={1}
            placeholder="handle"
            borderColor={validate && !isValidSlug(slug) ? "$red10" : undefined}
            onFocus={() => setValidate(false)}
            ref={slugRef}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
          />
        </XStack>
      </YStack>
      <Button onPress={createStack} marginTop="$3">
        Create my profile
      </Button>
    </YStack>
  );
}
