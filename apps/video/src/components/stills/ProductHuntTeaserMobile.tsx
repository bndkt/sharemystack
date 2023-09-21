import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function ProductHuntTeaserMobile() {
  const { width } = useVideoConfig();
  const phoneWidth = 500; // 1530

  return (
    <AbsoluteFill>
      <Phone
        width={phoneWidth * 0.9}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.49.png"
        className="absolute z-10"
        style={{
          left: 0,
          top: 100,
        }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-20 at 17.53.32.png"
        className="absolute z-30"
        style={{
          left: width / 2 - phoneWidth / 2,
          top: 40,
        }}
      />
      <Phone
        width={phoneWidth * 0.9}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.36.png"
        className="absolute z-10"
        style={{
          right: 0,
          top: 100,
        }}
      />
    </AbsoluteFill>
  );
}
