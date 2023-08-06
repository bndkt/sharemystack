import BottomSheet from "@gorhom/bottom-sheet";
import { useTheme, Text } from "@tamagui/core";
import { X } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { Button } from "tamagui";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { Share } from "@/components/share/Share";
import { useProfile } from "@/hooks/data/useProfile";
import { useAuth } from "@/hooks/useAuth";

export default function ShareRoute() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useTheme();
  const router = useRouter();
  const { stack: stackId } = useLocalSearchParams<{
    stack: string;
  }>();

  const { user } = useAuth();
  const { profile, stack, picks } = useProfile({ user, stackId });

  const snapPoints = useMemo(() => ["75%"], []); // "25%", "50%", "75%"

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        onClose={() => router.push(`/(tabs)/stacks/my/${stackId}/_tmp`)}
        style={{
          shadowColor: theme.color.val,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: theme.background.val,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.color.val,
        }}
        handleStyle={{
          backgroundColor: theme.background.val,
        }}
        backgroundStyle={{ backgroundColor: theme.background.val }}
      >
        <CustomSuspense
          data={profile}
          name="profile"
          component={(profile) => (
            <CustomSuspense
              data={picks}
              name="picks"
              component={(picks) => (
                <CustomSuspense
                  data={stack}
                  name="stack"
                  component={(stack) => (
                    <Share profile={profile} stack={stack} picks={picks} />
                  )}
                />
              )}
            />
          )}
        />
      </BottomSheet>
    </>
  );
}
