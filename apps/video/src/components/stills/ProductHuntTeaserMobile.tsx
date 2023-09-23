import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function ProductHuntTeaserMobile() {
  const { width } = useVideoConfig();
  const phoneWidth = 500; // 1530

  return (
    <AbsoluteFill>
      <Phone
        width={phoneWidth * 0.9}
        screenshot="stack.png"
        className="absolute z-10"
        style={{
          left: 0,
          top: 100,
        }}
      />
      <Phone
        width={phoneWidth}
        screenshot="home.png"
        className="absolute z-30"
        style={{
          left: width / 2 - phoneWidth / 2,
          top: 40,
        }}
      />
      <Phone
        width={phoneWidth * 0.9}
        screenshot="share.png"
        className="absolute z-10"
        style={{
          right: 0,
          top: 100,
        }}
      />
    </AbsoluteFill>
  );
}
