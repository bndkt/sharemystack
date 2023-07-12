import { Edit, Save, Trash2, Undo2 } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Button, H3, H4, Input, Text, XStack, YStack } from "tamagui";

import { Loading } from "@/components/Loading";
import { withAuth } from "@/components/auth/withAuth";
import { useAuth } from "@/components/providers/AuthProvider";
import { CreateStack } from "@/components/stacks/CreateStack";
import { PickList } from "@/components/stacks/PickList";
import { StackSheet } from "@/components/stacks/StackSheet";
import { StackResponse, getStack } from "@/lib/database/getStack";
import { supabase } from "@/lib/supabase";

function isValidSlug(str: string): boolean {
  // Ensure the slug is at least 3 characters long
  if (str.length < 3) {
    return false;
  }

  // Ensure the slug only contains alphanumeric characters (letters and numbers)
  const alphanumericRegex = /^[a-z0-9]+$/i;
  return alphanumericRegex.test(str);
}

function MyStack() {
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState<string | null | undefined>();
  const [slug, setSlug] = useState<string | null | undefined>();
  const [stack, setStack] = useState<StackResponse["data"]>(null);
  const { user } = useAuth();

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
    console.log("save");
    if (stack && slug && isValidSlug(slug)) {
      setEditing(false);
      return;
      /* const query = supabase
        .from("stacks")
        .update({ slug, name })
        .match({ id: stack.id });
      query.then((result) => {
        // console.log({ result });
        setEditing(false);
        // setRefresh(true);
      }); */
    }
  }

  function cancel() {
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
              <XStack>
                <Input
                  value={name ?? ""}
                  onChangeText={(text) => setName(text)}
                  borderBottomStartRadius={0}
                  borderBottomEndRadius={0}
                  flexGrow={1}
                />
                <Button
                  icon={<Save size="$1" />}
                  unstyled
                  justifyContent="center"
                  marginLeft="$2"
                  onPress={save}
                />
              </XStack>
            ) : (
              <H3>{stack.name ?? "<Unnamed stack>"}</H3>
            )}
            {editing ? (
              <XStack>
                <Input
                  value={slug ?? ""}
                  onChangeText={(text) => setSlug(text)}
                  borderTopWidth={0}
                  borderTopStartRadius={0}
                  borderTopEndRadius={0}
                  flexGrow={1}
                />
                <Button
                  icon={<Undo2 size="$1" />}
                  unstyled
                  justifyContent="center"
                  marginLeft="$2"
                  onPress={cancel}
                />
              </XStack>
            ) : (
              <H4>{stack.slug}</H4>
            )}
          </YStack>
          {!editing && (
            <Button
              icon={<Edit size="$1" />}
              unstyled
              justifyContent="center"
              marginLeft="$2"
              onPress={() => setEditing(true)}
            />
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
