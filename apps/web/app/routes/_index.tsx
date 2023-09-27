import { MetaFunction } from "@remix-run/cloudflare";

import { config } from "~/lib/config";
import { Hero } from "~/components/home/Hero";
import { PrimaryFeatures } from "~/components/home/PrimaryFeatures";
import { SecondaryFeatures } from "~/components/home/SecondaryFeatures";
import { Faq } from "~/components/home/Faq";
import { CallToAction } from "~/components/home/CallToAction";
import { Pricing } from "~/components/home/Pricing";
import { Reviews } from "~/components/home/Reviews";
import { Builder } from "~/components/home/Builder";

export const meta: MetaFunction = () => [
  {
    title: `${config.name} - ${config.tagline}`,
  },
  {
    property: "og:title",
    content: `${config.name} - ${config.tagline}`,
  },
  {
    property: "og:description",
    content:
      "Curate your personal productivity stack or your favorite development stack. Share it within the app or on social media. Discover what other people are using and get inspired to try out new tools.",
  },
  {
    property: "og:image",
    content: "https://sharemystack.com/og.png",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      {/* <SecondaryFeatures /> */}
      {/* <CallToAction /> */}
      {/* <Reviews /> */}
      {/* <Pricing /> */}
      <Builder />
      <Faq />
    </>
  );
}
