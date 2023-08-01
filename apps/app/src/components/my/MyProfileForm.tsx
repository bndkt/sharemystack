import { useEffect, useMemo, useRef, useState } from "react";
import { TextInput } from "react-native";
import { Button, Input, XStack, YStack, debounce } from "tamagui";

import { supabase } from "@/lib/supabase";
import { isValidName, isValidSlug, sanitizeSlug } from "@/lib/validation";

export function MyProfileForm({
  initialName,
  initialSlug,
  label,
  onSubmit,
}: {
  initialName: string;
  initialSlug: string;
  label: string;
  onSubmit: ({ name, slug }: { name: string; slug: string }) => void;
}) {
  const [name, setName] = useState<string | undefined>(initialName);
  const [slug, setSlug] = useState<string | undefined>(
    sanitizeSlug(initialSlug)
  );
  const [validate, setValidate] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const slugRef = useRef<TextInput>(null);

  function handleSubmit() {
    nameRef.current?.blur();
    slugRef.current?.blur();

    if (slug && isValidSlug(slug) && name && isValidName(name)) {
      onSubmit({ name, slug });
    } else {
      setValidate(true);
    }
  }

  async function slugExists(slug: string) {
    const { data } = await supabase.rpc("slug_exists", { input_slug: slug });
    return data;
  }

  const doCallbackWithDebounce = useMemo(() => {
    const callback = (slug: string) => slugExists(slug);
    return debounce(callback, 100);
  }, [slug]);

  function handleSlugChange(text: string) {
    setSlug(sanitizeSlug(text));
    doCallbackWithDebounce(text);
  }

  return (
    <YStack>
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
            onChangeText={handleSlugChange}
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
      <Button onPress={handleSubmit} marginTop="$3" themeInverse>
        {label}
      </Button>
    </YStack>
  );
}
