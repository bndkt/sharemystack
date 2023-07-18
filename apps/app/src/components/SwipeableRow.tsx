import { ReactNode } from "react";
import { Animated } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, XStack } from "tamagui";

function RightAction({
  text,
  color,
  x,
  progress,
  onPress,
}: {
  text: ReactNode;
  color: string;
  x: number;
  progress: Animated.AnimatedInterpolation<number>;
  onPress: () => void;
}) {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <Button
        backgroundColor={color}
        unstyled
        height="100%"
        onPress={onPress}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        {text}
      </Button>
    </Animated.View>
  );
}

function RightActions({
  rightActions,
  progress,
}: {
  rightActions: { text: ReactNode; color: string; onPress: () => void }[];
  progress: Animated.AnimatedInterpolation<number>;
}) {
  return (
    <XStack width={rightActions.length * 64} paddingBottom={3}>
      {rightActions.map((action, index) => {
        return (
          <RightAction
            key={index}
            text={action.text}
            color={action.color}
            x={(index + 1) * 64}
            progress={progress}
            onPress={action.onPress}
          />
        );
      })}
    </XStack>
  );
}

export function SwipeableRow({
  children,
  rightActions,
}: {
  children: ReactNode;
  // leftActions?: { text: ReactNode; color: string; onPress: () => void }[];
  rightActions?: { text: ReactNode; color: string; onPress: () => void }[];
}) {
  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      // renderLeftActions={this.renderLeftActions}
      renderRightActions={
        rightActions
          ? (progress) => (
              <RightActions rightActions={rightActions} progress={progress} />
            )
          : undefined
      }
      onSwipeableOpen={(direction) => {
        console.log(`Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={(direction) => {
        console.log(`Closing swipeable to the ${direction}`);
      }}
    >
      {children}
    </Swipeable>
  );
}
