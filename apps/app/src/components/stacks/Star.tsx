import { Star as StarIcon } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Button, Spinner, YStack } from "tamagui";

import { useAnalytics } from "@/hooks/useAnalytics";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "@/model/Stack";

export function Star({ stack }: { stack: Stack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isStarred, setIsStarred] = useState(false);
  const { user, session } = useAuth();
  const { capture } = useAnalytics();

  function toggleStar() {
    if (isStarred) {
      stack.removeStar();
    } else {
      user && stack.addStar(user.id);
      capture("Stack starred", { stack: stack.id });
    }
  }

  useEffect(() => {
    if (stack) {
      const subscription = stack.stars.observeCount().subscribe((count) => {
        setIsStarred(count > 0);
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, [stack]);

  return session ? (
    isLoading ? (
      <Spinner />
    ) : (
      <YStack justifyContent="center">
        <Button
          icon={
            <StarIcon fill={isStarred ? "black" : "transparent"} size="$1" />
          }
          unstyled
          onPress={toggleStar}
        />
      </YStack>
    )
  ) : null;
}
