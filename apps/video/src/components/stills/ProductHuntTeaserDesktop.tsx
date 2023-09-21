import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function ProductHuntTeaserDesktop() {
  const { width, height } = useVideoConfig();
  const ratio = 1530 / 3036;
  const phoneWidth = 800; // 1530
  const phoneHeight = Math.floor(phoneWidth / ratio);

  return (
    <AbsoluteFill>
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-20 at 17.53.32.png"
        className="absolute z-30"
        style={{
          left: width / 2 - phoneWidth / 2,
          top: height / 2 - phoneHeight / 2,
        }}
      />
    </AbsoluteFill>
  );
}
