import { Button, Text, YStack } from "tamagui";

import { withAuth } from "@/components/auth/withAuth";

function SSO() {
  return (
    <YStack>
      <Text>SSO</Text>
      <Button onPress={() => {}}>Authenticate</Button>
    </YStack>
  );
}

export default withAuth(SSO);
