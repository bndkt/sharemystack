import { loadFont } from "@remotion/google-fonts/Inter";

import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";
import { Logo } from "../Logo";
import producthunt from "../images/producthunt.svg";

const { fontFamily } = loadFont();

export function TwitterPost() {
  const phoneWidth = 450; // 1530

  return (
    <AbsoluteFill className="bg-rose-500 text-white" style={{ fontFamily }}>
      <div className="flex flex-row items-center pt-12 pl-12">
        <Logo className="h-16 w-auto text" />
        <p className="ml-4 text-3xl font-semibold">Share My Stack</p>
      </div>
      <div className="absolute bottom-12 left-12 w-1/3 text-8xl leading-tight">
        <div>Only one more day</div>
        <img src={producthunt} className="mt-12 h-24" />
      </div>
      {/* Center */}
      <Phone
        width={phoneWidth}
        screenshot="stack.png"
        className="absolute z-20 top-[150px]"
        style={{ right: phoneWidth + 48 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="home.png"
        className="absolute z-30 top-[95px]"
        style={{ right: phoneWidth / 2 + 48 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="share.png"
        className="absolute z-10 top-[150px]"
        style={{ right: 48 }}
      />
    </AbsoluteFill>
  );
}
