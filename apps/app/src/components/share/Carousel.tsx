import { useRef, useState } from "react";
import { FlatList } from "react-native";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, Theme, YStack } from "tamagui";

import { TemplateSelector } from "./TemplateSelector";
import { Target, Template, TemplateProps, templates } from "./templates";

const THUMB_SIZE = 80;

export function Carousel({
  templateProps,
  onShare,
}: {
  templateProps: Omit<TemplateProps, "width">;
  onShare: ({ uri, target }: { uri: string; target: Target }) => Promise<void>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);
  const [width, setWidth] = useState(0);
  const viewShotRef = useRef<ViewShot>(null);

  const scrollToIndex = (index: number) => {
    if (index === activeIndex) {
      return;
    }
    maxRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (THUMB_SIZE + 10) - width / 2 + THUMB_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    setActiveIndex(index);
  };

  function handleShare() {
    const target = templates[activeIndex].target;

    viewShotRef.current?.capture &&
      viewShotRef.current?.capture().then(async (uri: string) => {
        await onShare({ target, uri });
        releaseCapture(uri);
      });
  }

  return (
    <YStack
      space="$3"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
      <Theme name={templateProps.options.darkMode ? "dark" : "light"}>
        <FlatList
          ref={maxRef}
          data={templates}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          pagingEnabled
          onMomentumScrollEnd={(ev) => {
            scrollToIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item, index }: { item: Template; index: number }) => {
            const newTemplateProps = { ...templateProps, width };
            const Component = () => item.component(newTemplateProps);
            return index === activeIndex ? (
              <ViewShot
                ref={viewShotRef}
                options={{
                  format: "png",
                  fileName: "sharemystack.png",
                  // result: "base64",
                }}
              >
                <Component />
              </ViewShot>
            ) : (
              <Component />
            );
          }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </Theme>
      <FlatList
        ref={thumbRef}
        data={templates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }: { item: Template; index: number }) => {
          return (
            <TemplateSelector
              active={index === activeIndex}
              target={item.target}
              onPress={() => {
                scrollToIndex(index);
              }}
            />
          );
        }}
      />
      <Button
        marginHorizontal="$3"
        backgroundColor="$sms"
        color="white"
        onPress={handleShare}
      >
        Share My Stack
      </Button>
    </YStack>
  );
}
