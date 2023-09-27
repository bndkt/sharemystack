import { config } from "~/lib/config";
import { Logo } from "./Logo";

export function OgImage({
  ogTitle,
  pathname,
}: {
  ogTitle: string;
  pathname: string;
}) {
  console.log({ pathname });
  const title = ogTitle.replace(/- Share My Stack/g, "");

  return (
    <div
      style={{
        color: config.color,
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 50,
          paddingTop: 50,
        }}
      >
        <Logo style={{ display: "flex", width: 75, height: 75 }} />
        <div style={{ display: "flex", fontSize: 48, marginLeft: 15 }}>
          Share My Stack
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          alignItems: "flex-end",
          fontSize: 72,
          paddingLeft: 50,
          paddingBottom: 50,
        }}
      >
        Check out {title}
      </div>
    </div>
  );
}
