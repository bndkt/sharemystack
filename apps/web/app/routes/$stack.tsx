import { LoaderArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { config } from "~/lib/config";

export async function loader({ params }: LoaderArgs) {
  if (params.stack?.toLowerCase().substring(0, 1) !== "@") {
    throw new Error("Invalid stack name");
  }

  return {
    stack: params.stack?.toLowerCase().substring(1),
  };
}

export default function Stack() {
  const data = useLoaderData<typeof loader>();
  console.log({ data });

  const link = `https://${config.domain}/@${data.stack}`;

  return (
    <div className="content-center text-center pt-16 text-white">
      <div className="mx-auto pb-1 w-24"></div>
      <h2>@{data.stack}</h2>
      <div className="pt-16">
        Please note that Share My Stack
        <br /> is currently only available on iOS.
        <br />
        Follow us{" "}
        <a href="https://twitter.com/sharemystack" className="font-bold">
          @sharemystack
        </a>{" "}
        for updates.
      </div>
    </div>
  );
}
