import { AbsoluteFill, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

import { Phone } from "../devices/Phone";
import { Logo } from "../Logo";

export function OgImage() {
  const { width } = useVideoConfig();
  const phoneWidth = 500; // 1530

  return (
    <AbsoluteFill className="flex bg-white text-sms-500">
      <div className="flex flex-row items-center pt-12 pl-12">
        <Logo className="h-24 w-auto text" />
        <p className="ml-4 text-5xl font-semibold">Share My Stack</p>
      </div>
      <div
        className="absolute bottom-12 left-12 w-1/2 text-6xl leading-tight"
        style={{ fontFamily }}
      >
        Share your stack with the world.
      </div>
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-20 at 17.53.32.png"
        className="absolute z-10 right-12 top-16"
      />
    </AbsoluteFill>
  );
}
