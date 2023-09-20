import { Hero } from "~/components/home/Hero";
import { PrimaryFeatures } from "~/components/home/PrimaryFeatures";
import { SecondaryFeatures } from "~/components/home/SecondaryFeatures";
import { Faqs } from "~/components/home/Faqs";
import { CallToAction } from "~/components/home/CallToAction";
import { Pricing } from "~/components/home/Pricing";
import { Reviews } from "~/components/home/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryFeatures />
      {/* <SecondaryFeatures /> */}
      {/* <CallToAction /> */}
      {/* <Reviews />
      <Pricing /> */}
      {/* <Faqs /> */}
    </>
  );
}
