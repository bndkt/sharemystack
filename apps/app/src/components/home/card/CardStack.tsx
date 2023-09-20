import { useEffect } from "react";
import {
  Directions,
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  cancelAnimation,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { YStack } from "tamagui";

import { Card } from "./Card";

import { Tool } from "@/model/Tool";

const duration = 500;
export const maxVisibleItems = 5;

export function CardStack({ tools }: { tools: Tool[] }) {
  const floatActiveIndex = useSharedValue(0);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      cancelAnimation(floatActiveIndex);

      if (floatActiveIndex.value <= 0) {
        floatActiveIndex.value = 0;
        return;
      }
      floatActiveIndex.value = withTiming(floatActiveIndex.value - 1, {
        duration,
      });
    });

  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      if (floatActiveIndex.value === tools.length - maxVisibleItems) {
        floatActiveIndex.value = 0;
        return;
      }

      floatActiveIndex.value = withTiming(floatActiveIndex.value + 1, {
        duration,
      });
    });

  useEffect(() => {
    function nextCard(first = false) {
      if (floatActiveIndex.value === tools.length - maxVisibleItems) {
        floatActiveIndex.value = 0;
      } else if (!first) {
        floatActiveIndex.value = withTiming(floatActiveIndex.value + 1, {
          duration,
        });
      }

      return setTimeout(() => {
        nextCard();
      }, 3000);
    }

    const timeout = nextCard(true);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={Gesture.Exclusive(flingUp, flingDown)}>
        <YStack
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
          marginBottom="$3"
          pointerEvents="box-none"
        >
          {tools.map((tool, index) => {
            return (
              <Card
                tool={tool}
                key={tool.id}
                index={index}
                totalLength={tools.length - 1}
                activeIndex={floatActiveIndex}
                maxVisibleItems={maxVisibleItems}
              />
            );
          })}
        </YStack>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
