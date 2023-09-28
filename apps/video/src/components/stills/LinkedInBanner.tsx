import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function LinkedInBanner() {
  const { width } = useVideoConfig();
  const phoneWidth = 400; // 1530

  return (
    <AbsoluteFill className="bg-rose-500">
      <Phone
        width={phoneWidth}
        screenshot="stack.png"
        className="absolute z-10 top-[120px]"
        style={{ left: width / 5 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="profile.png"
        className="absolute z-20 top-[80px]"
        style={{ left: width / 3 - phoneWidth / 2 }}
      />
      {/* Center */}
      <Phone
        width={phoneWidth}
        screenshot="home.png"
        className="absolute z-30 top-[50px]"
        style={{ left: width / 2 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="creator.png"
        className="absolute z-20 top-[80px]"
        style={{ right: width / 3 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="share.png"
        className="absolute z-10 top-[120px]"
        style={{ right: width / 5 - phoneWidth / 2 }}
      />
    </AbsoluteFill>
  );
}
