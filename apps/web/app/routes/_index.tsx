import { Hero } from "~/components/home/Hero";
import { PrimaryFeatures } from "~/components/home/PrimaryFeatures";
import { SecondaryFeatures } from "~/components/home/SecondaryFeatures";
import { Faq } from "~/components/home/Faq";
import { CallToAction } from "~/components/home/CallToAction";
import { Pricing } from "~/components/home/Pricing";
import { Reviews } from "~/components/home/Reviews";
import { Builder } from "~/components/home/Builder";

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
