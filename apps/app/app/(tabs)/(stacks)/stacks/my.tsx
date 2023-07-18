import {
  Edit,
  Save,
  Share as ShareIcon,
  Trash2,
  Undo2,
} from "@tamagui/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { TextInput, Share } from "react-native";
import { Button, H3, H4, Input, Text, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/components/providers/AuthProvider";
import { CreateStack } from "@/components/stacks/CreateStack";
import { PickList } from "@/components/picks/PickList";
import { StackSheet } from "@/components/stacks/StackSheet";
import { config } from "@/lib/config";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";
import { isValidSlug } from "@/lib/validation";

function MyStack() {
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState<string | null | undefined>();
  const [slug, setSlug] = useState<string | null | undefined>();
  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const { user } = useAuth();
  const [validate, setValidate] = useState(false);
  const nameRef = useRef<TextInput>(null);
  const slugRef = useRef<TextInput>(null);

  useEffect(() => {
    if (user && (!stack || refresh)) {
      getStack({ user: user.id }).then(({ data }) => {
        setStack(data);
        setName(data?.name);
        setSlug(data?.slug);
        setLoading(false);
        setRefresh(false);
      });
    }
  }, [user, stack, refresh]);

  function removePick(stackId: string | null, toolId: string | null) {
    setLoading(true);
    const query = supabase
      .from("picks")
      .delete()
      .match({ stack_id: stackId, tool_id: toolId });
    query.then((result) => {
      // console.log({ result });
      setRefresh(true);
    });
  }

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
        setRefresh(true);
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

  return isLoading ? (
    <Loading />
  ) : stack ? (
    <YStack fullscreen>
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
      <PickList
        picks={stack.picks_view}
        placeholder={
          <YStack padding="$3">
            <Text marginBottom="$3" textAlign="center">
              You have not added any tools to your stack yet.
            </Text>
          </YStack>
        }
        generateRightActions={(item) => [
          {
            text: <Trash2 color="white" />,
            color: "$red10",
            onPress: () => removePick(item.stack_id, item.tool_id),
          },
        ]}
      />
      <StackSheet stack={stack.id} refresh={() => setRefresh(true)} />
    </YStack>
  ) : (
    <CreateStack refresh={() => setRefresh(true)} />
  );
}

export default withAuth(MyStack);
