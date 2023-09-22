import { Dimensions, Text } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { H3, XStack, YStack } from "tamagui";

import { CustomSuspense } from "@/components/loading/CustomSuspense";
import { ToolIcon } from "@/components/tools/ToolIcon";
import { Tool } from "@/model/Tool";

const AnimatedCard = Animated.createAnimatedComponent(XStack);

const { width } = Dimensions.get("window");

const _size = width * 0.9;
const layout = {
  width: _size,
  height: _size * 1.27,
  spacing: 12,
  cardsGap: 10,
};

type CardProps = {
  totalLength: number;
  activeIndex: SharedValue<number>;
  index: number;
  tool: Tool;
  maxVisibleItems: number;
};

export function Card({
  tool,
  index,
  totalLength,
  activeIndex,
  maxVisibleItems,
}: CardProps) {
  const stylez = useAnimatedStyle(() => {
    return {
      position: "absolute",
      zIndex: totalLength - index,
      opacity: interpolate(
        activeIndex.value,
        [index - 1, index, index + 1],
        [1 - 1 / maxVisibleItems, 1, 1],
      ),
      transform: [
        {
          translateY: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [-layout.cardsGap, 0, layout.height - layout.cardsGap * 2],
            {
              // If you'd like to stack the bottom cards on top of eachother
              // add CLAMP instead of EXTEND.
              // extrapolateRight: Extrapolate.CLAMP,
              extrapolateRight: Extrapolate.CLAMP,
            },
          ),
        },
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.95, 1, 1],
          ),
        },
      ],
    };
  });
  return (
    <AnimatedCard
      padding="$3"
      marginHorizontal="$3"
      backgroundColor="white"
      borderRadius="$3"
      style={stylez}
    >
      <YStack flexGrow={1}>
        <H3 color="$sms">{tool.name}</H3>
        <CustomSuspense
          promise={tool.categories.fetch()}
          name="categories"
          component={(categories) =>
            categories.length > 0 ? (
              <XStack gap="$3">
                <Text>{categories[0].name}</Text>
              </XStack>
            ) : (
              <></>
            )
          }
        />
      </YStack>
      <ToolIcon tool={tool} size="$5" />
    </AnimatedCard>
  );
}
