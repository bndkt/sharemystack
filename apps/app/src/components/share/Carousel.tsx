import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

import { TemplateSelector } from "./TemplateSelector";
import { Template, TemplateProps, templates } from "./templates";

const THUMB_SIZE = 80;

export function Carousel({
  templateProps,
}: {
  templateProps: Omit<TemplateProps, "width">;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);
  const [width, setWidth] = useState(0);

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

  return (
    <YStack
      space="$3"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
    >
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
        renderItem={({ item }: { item: Template }) => {
          const newTemplateProps = { ...templateProps, width };
          const Component = () => item.component(newTemplateProps);
          return <Component />;
        }}
        contentContainerStyle={{ alignItems: "center" }}
      />
      <FlatList
        ref={thumbRef}
        data={templates}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
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
    </YStack>
  );
}
