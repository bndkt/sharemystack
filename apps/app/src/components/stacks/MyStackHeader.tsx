import {
  Edit,
  Save,
  Share as ShareIcon,
  Trash2,
  Undo2,
} from "@tamagui/lucide-icons";
import { useRef, useState } from "react";
import { TextInput, Share } from "react-native";
import { Button, H3, H4, Input, XStack, YStack } from "tamagui";

import { config } from "@/lib/config";
import { StackResponse } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";
import { isValidSlug } from "@/lib/validation";
import { Stack } from "@/model/Stack";

export function MyStackHeader({
  stack,
  refresh,
}: {
  stack: NonNullable<StackResponse["data"] | Stack>;
  refresh: () => void;
}) {
  const [isLoading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState<string | null | undefined>();
  const [slug, setSlug] = useState<string | null | undefined>();
  const [validate, setValidate] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const slugRef = useRef<TextInput>(null);

  function save() {
    nameRef.current?.blur();
    slugRef.current?.blur();
    setValidate(true);
    if (stack && slug && isValidSlug(slug)) {
      setLoading(true);

      const query = supabase
        .from("stacks")
        .update({ slug, name })
        .match({ id: stack.id });
      query.then((result) => {
        console.log({ result });
        setEditing(false);
        refresh();
      });
    }
  }

  function cancel() {
    setValidate(false);
    if (stack) {
      setName(stack.name);
      setSlug(stack.slug);
    }
    setEditing(false);
  }

  return (
    <YStack padding="$3">
      <XStack alignContent="center">
        <YStack flexGrow={1}>
          {editing ? (
            <XStack alignItems="center">
              <Input
                value={name ?? ""}
                onChangeText={(text) => setName(text)}
                borderBottomStartRadius={0}
                borderBottomEndRadius={0}
                flexGrow={1}
                ref={nameRef}
                borderColor={validate && !name ? "$red10" : undefined}
                placeholder="Name"
                onFocus={() => setValidate(false)}
              />
              <Button
                icon={<Save size="$1" />}
                unstyled
                justifyContent="center"
                marginLeft="$3"
                onPress={save}
              />
            </XStack>
          ) : (
            <H3>{stack.name ?? "<Unnamed stack>"}</H3>
          )}
          {editing ? (
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
                borderColor={
                  validate && !isValidSlug(slug) ? "$red10" : undefined
                }
              />
              <Input
                value={slug ?? ""}
                onChangeText={(text) =>
                  (!text || isValidSlug(text, true)) &&
                  setSlug(text.toLowerCase())
                }
                borderColor={
                  validate && !isValidSlug(slug) ? "$red10" : undefined
                }
                borderLeftWidth={0}
                borderTopWidth={0}
                borderTopStartRadius={0}
                borderTopEndRadius={0}
                borderBottomStartRadius={0}
                paddingLeft={0}
                flexGrow={1}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                ref={slugRef}
                placeholder="handle"
                onFocus={() => setValidate(false)}
              />
              <Button
                icon={<Undo2 size="$1" />}
                unstyled
                justifyContent="center"
                marginLeft="$3"
                onPress={cancel}
              />
            </XStack>
          ) : (
            <H4>@{stack.slug}</H4>
          )}
        </YStack>
        {!editing && (
          <>
            <Button
              icon={<Edit size="$1" />}
              unstyled
              justifyContent="center"
              padding="$3"
              onPress={() => setEditing(true)}
            />
            <Button
              icon={<ShareIcon size="$1" />}
              unstyled
              justifyContent="center"
              padding="$3"
              onPress={async () => {
                await Share.share({
                  url: `${config.domain}/@${slug}`,
                });
              }}
            />
          </>
        )}
      </XStack>
      {/* <XStack space="$2">
          {stack.website && <Button size="$3" onPress={() => {}} icon={Link} />}
          {stack.twitter && (
            <Button size="$3" onPress={() => {}} icon={Twitter} />
          )}
          </XStack> */}
    </YStack>
  );
}
