import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";
import { Logo } from "../Logo";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export function InstagramPost() {
  const { width } = useVideoConfig();
  const phoneWidth = 450; // 1530

  return (
    <AbsoluteFill className="bg-rose-500 text-white" style={{ fontFamily }}>
      <div className="flex flex-row items-center pt-12 pl-12">
        <Logo className="h-16 w-auto text" />
        <p className="ml-4 text-3xl font-semibold">Share My Stack</p>
      </div>
      <div className="absolute bottom-12 left-12 w-1/2 text-8xl leading-tight">
        <div className="mb-4">Available for pre-order now</div>
      </div>
      <Phone
        width={phoneWidth}
        screenshot="home.png"
        className="absolute z-30 top-[175px]"
        style={{ right: 50 }}
      />
    </AbsoluteFill>
  );
}
