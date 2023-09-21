import { Img, staticFile } from "remotion";

export function Phone({
  screenshot,
  width,
  style,
  className,
}: {
  screenshot: string;
  width: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ratio = 1530 / 3036;
  const height = Math.floor(width / ratio);
  const zoom = width / 1530;
  const screenshotRatio = 1290 / 2796;
  const screenshotWidth = Math.floor(1290 * zoom);
  const screenshotHeight = Math.floor(screenshotWidth / screenshotRatio);

  console.log({ ratio, height, zoom, screenshotWidth });

  return (
    <div className={className} style={{ width, height, ...style }}>
      <div className="flex justify-center items-center">
        <Img
          src={staticFile(
            "images/devices/iPhone 15 Pro Max - Black Titanium - Portrait.png",
          )}
          className="absolute z-20"
          style={{ width, height }}
        />
        <Img
          src={staticFile(`images/screenshots/${screenshot}`)}
          // width={1290}
          className="flex z-10"
          style={{
            width: screenshotWidth,
            height: screenshotHeight,
            borderRadius: 100 * zoom,
          }}
        />
      </div>
    </div>
  );
}
