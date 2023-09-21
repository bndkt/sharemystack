import { AbsoluteFill, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

import { Phone } from "../devices/Phone";

export function ProductHuntGallery2() {
  const { width } = useVideoConfig();
  const phoneWidth = 500; // 1530

  return (
    <AbsoluteFill className="bg-rose-500">
      <div
        className="absolute left-12 top-12 w-1/2 text-6xl text-white leading-tight"
        style={{ fontFamily }}
      >
        Share your <b>personal productivity stack</b> or{" "}
        <b>favorite tech stack</b> on social media.
      </div>
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.36.png"
        className="absolute z-10"
        style={{ right: width / 5 - phoneWidth / 2, top: 50 }}
      />
    </AbsoluteFill>
  );
}
