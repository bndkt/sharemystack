import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";
import { Logo } from "../Logo";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

export function CreatorBanner() {
  const { width } = useVideoConfig();
  const phoneWidth = 380; // 1530

  const creator = {
    image:
      "https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_400x400.jpg",
    name: "Kent C. Dodds",
    slug: "kentcdodds",
  };

  return (
    <AbsoluteFill className="bg-rose-500 text-white" style={{ fontFamily }}>
      <div className="flex flex-row items-center pt-12 pl-12">
        <Logo className="h-16 w-auto text" />
        <p className="ml-4 text-3xl font-semibold">Share My Stack</p>
      </div>
      <div className="absolute bottom-12 left-12 w-72 text-3xl leading-tight">
        <img
          src={creator.image}
          className="w-20 rounded-full mb-4 border-white border-2"
        />
        <div className="mb-4">
          Discover which tools <b>{creator.name}</b> is using.
        </div>
        <div className="text-xl">https://sharemystack.com/@{creator.slug}</div>
      </div>
      {/* Center */}
      <Phone
        width={phoneWidth}
        screenshot="home.png"
        className="absolute z-20 top-[160px]"
        style={{ left: width / 2 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="creator.png"
        className="absolute z-30 top-[120px]"
        style={{ right: width / 3 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="share.png"
        className="absolute z-10 top-[160px]"
        style={{ right: width / 5 - phoneWidth / 2 }}
      />
    </AbsoluteFill>
  );
}
