import { FlashList } from "@shopify/flash-list";
import { Share } from "@tamagui/lucide-icons";
import { useRef, useState } from "react";
import ViewShot, { releaseCapture } from "react-native-view-shot";
import { Button, Theme, YStack, useThemeName } from "tamagui";

import { TShareOptions, ShareOptions } from "./ShareOptions";
import { TemplateSelector } from "./TemplateSelector";
import { Target, Template, TemplateProps, templates } from "./templates";

import { useAnalytics } from "@/hooks/useAnalytics";

const THUMB_SIZE = 80;

export function Carousel({
  templateProps,
  onShare,
}: {
  templateProps: Omit<TemplateProps, "width" | "options">;
  onShare: ({ uri, target }: { uri: string; target: Target }) => Promise<void>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxRef = useRef<FlashList<Template>>(null);
  const thumbRef = useRef<FlashList<Template>>(null);
  const [width, setWidth] = useState(0);
  const viewShotRef = useRef<ViewShot>(null);
  const { capture } = useAnalytics();
  const themeName = useThemeName();

  const [options, setOptions] = useState<TShareOptions>({
    showTitle: true,
    darkMode: themeName === "dark",
  });

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

    if (viewShotRef.current?.capture) {
      viewShotRef.current?.capture().then(async (uri: string) => {
        await onShare({ target, uri });
        releaseCapture(uri);
      });
    }

    capture("stack_shared", { target });
  }

  return (
    <YStack
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
      flexGrow={1}
    >
      {width > 0 ? (
        <YStack flexGrow={1}>
          <FlashList
            ref={thumbRef}
            data={templates}
            horizontal
            centerContent={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            estimatedItemSize={width}
            extraData={activeIndex}
            renderItem={({
              item,
              index,
            }: {
              item: Template;
              index: number;
            }) => {
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
          <YStack
            // flex={1}
            alignItems="center"
            justifyContent="center"
            borderTopWidth="$1"
            borderBottomWidth="$1"
            borderColor="$sms"
            backgroundColor="$text"
          >
            <YStack height={width}>
              <Theme name={options.darkMode ? "dark" : "light"}>
                <FlashList
                  ref={maxRef}
                  data={templates}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  pagingEnabled
                  onMomentumScrollEnd={(ev) => {
                    scrollToIndex(
                      Math.floor(ev.nativeEvent.contentOffset.x / width),
                    );
                  }}
                  extraData={{ options, activeIndex }}
                  estimatedItemSize={width}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: Template;
                    index: number;
                  }) => {
                    const newTemplateProps = {
                      ...templateProps,
                      width,
                      options,
                    };
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
                />
              </Theme>
            </YStack>
          </YStack>
          <Button
            marginHorizontal="$3"
            backgroundColor="$sms"
            color="white"
            onPress={handleShare}
            icon={<Share size="$1" />}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            alignSelf="center"
          >
            Share my stack
          </Button>
        </YStack>
      ) : null}
      <ShareOptions options={options} setOptions={setOptions} />
    </YStack>
  );
}
