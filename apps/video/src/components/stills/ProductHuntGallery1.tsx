import { AbsoluteFill, useVideoConfig } from "remotion";
import { Phone } from "../devices/Phone";

export function ProductHuntGallery1() {
  const { width } = useVideoConfig();
  const phoneWidth = 380; // 1530

  return (
    <AbsoluteFill className="bg-rose-500">
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.49.png"
        className="absolute z-10 top-[160px]"
        style={{ left: width / 5 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.22.44.png"
        className="absolute z-20 top-[120px]"
        style={{ left: width / 3 - phoneWidth / 2 }}
      />
      {/* Center */}
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-20 at 17.53.32.png"
        className="absolute z-30 top-[80px]"
        style={{ left: width / 2 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.44.png"
        className="absolute z-20 top-[120px]"
        style={{ right: width / 3 - phoneWidth / 2 }}
      />
      <Phone
        width={phoneWidth}
        screenshot="Simulator Screenshot - iPhone 14 Pro Max - 2023-09-19 at 09.23.36.png"
        className="absolute z-10 top-[160px]"
        style={{ right: width / 5 - phoneWidth / 2 }}
      />
    </AbsoluteFill>
  );
}
