import { LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import QRCode from "react-qr-code";

import { config } from "~/lib/config";

export async function loader({ params }: LoaderArgs) {
  return {
    stack: params.stack?.toLowerCase().substring(1),
  };
}

export default function Stack() {
  const data = useLoaderData<typeof loader>();

  const link = `https://${config.domain}/@${data.stack}`;

  return (
    <div className="content-center text-center pt-32 text-white">
      <div className="mx-auto pb-1 w-24">
        <a href={link}>
          <QRCode
            value={link}
            bgColor="transparent"
            fgColor="#ffffff"
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            viewBox={`0 0 256 256`}
          />
        </a>
      </div>
      <h2>@{data.stack}</h2>
    </div>
  );
}
