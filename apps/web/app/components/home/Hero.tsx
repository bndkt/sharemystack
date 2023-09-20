import { useId } from "react";
import clsx from "clsx";

import { AppStoreLink } from "~/components/home/AppStoreLink";
import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { PhoneFrame } from "~/components/home/PhoneFrame";
import logoBbc from "~/images/logos/bbc.svg";
import logoCbs from "~/images/logos/cbs.svg";
import logoCnn from "~/images/logos/cnn.svg";
import logoFastCompany from "~/images/logos/fast-company.svg";
import logoForbes from "~/images/logos/forbes.svg";
import logoHuffpost from "~/images/logos/huffpost.svg";
import logoTechcrunch from "~/images/logos/techcrunch.svg";
import logoWired from "~/images/logos/wired.svg";
import { config } from "~/lib/config";
import { ProductHunt } from "./ProductHunt";

function BackgroundIllustration(props: React.ComponentPropsWithoutRef<"div">) {
  let id = useId();

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          strokeOpacity="0.7"
          className="stroke-rose-100"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
            className="text-rose-500"
          >
            <stop stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          strokeOpacity="0.7"
          className="stroke-rose-100"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
            className="text-rose-500"
          >
            <stop stopColor="currentColor" stopOpacity="0.5" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PlayIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              {config.tagline}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Curate your personal productivity stack or your favorite
              development stack. Share it within the app or on social media.
              Discover what other people are using and get inspired to try out
              new tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              {config.videoLink ? (
                <Button to={config.videoLink} variant="outline">
                  <PlayIcon className="h-6 w-6 flex-none" />
                  <span className="ml-2.5">Watch the demo</span>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration
              className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0"
              style={{
                maskImage:
                  "linear-gradient(to bottom, white 20%, transparent 75%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, white 20%, transparent 75%)",
              }}
            />
            <div
              className="-mx-4 h-[448px] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32"
              style={{
                maskImage: "linear-gradient(to bottom, white 60%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, white 60%, transparent)",
              }}
            >
              <PhoneFrame className="mx-auto max-w-[366px]">
                <img src="/images/screenshot1.webp" />
              </PhoneFrame>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <ProductHunt />
            {/* <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
              As featured in
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ["Forbes", logoForbes],
                ["TechCrunch", logoTechcrunch],
                ["Wired", logoWired],
                ["CNN", logoCnn, "hidden xl:block"],
                ["BBC", logoBbc],
                ["CBS", logoCbs],
                ["Fast Company", logoFastCompany],
                ["HuffPost", logoHuffpost, "hidden xl:block"],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx("flex", className)}>
                  <img src={logo} alt={name} className="h-8" />
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
