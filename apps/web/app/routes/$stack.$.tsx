import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { QRCode } from "~/components/QRCode";
import { config } from "~/lib/config";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let ogImageUrl = `https://${config.domain}/@${data?.stack}/social-image.png`;
  if (data?.dark) {
    ogImageUrl = ogImageUrl.concat("?dark=true");
  }

  return [
    {
      title: `${data?.stack}’s Stack - ${config.name}`,
    },
    {
      property: "og:title",
      content: `@${data?.stack}’s Stack - ${config.name}`,
    },
    {
      property: "og:description",
      content:
        "Curate your personal productivity stack or your favorite development stack. Share it within the app or on social media. Discover what other people are using and get inspired to try out new tools.",
    },
    {
      property: "og:image",
      content: ogImageUrl,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    { property: "twitter:site", content: "@sharemystack" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const dark = params["*"] === "d" || params["*"] === "d";

  if (params.stack?.toLowerCase().substring(0, 1) !== "@") {
    throw new Error("Invalid stack name");
  }

  return {
    stack: params.stack?.toLowerCase().substring(1),
    dark,
  };
}

export default function Stack() {
  const data = useLoaderData<typeof loader>();
  const link = `https://${config.domain}/@${data.stack}`;

  return (
    <div className="content-center text-center py-16 text-sms-500">
      <QRCode data={link} className="mx-auto pb-1 w-24" />
      <h2>
        <a href={link}>@{data.stack}</a>
      </h2>
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
