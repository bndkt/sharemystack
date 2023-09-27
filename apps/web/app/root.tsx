import { MetaFunction, type LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import clsx from "clsx";

import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import styles from "./tailwind.css";
import { config } from "./lib/config";

export const meta: MetaFunction = () => [
  {
    title: `${config.name} - ${config.tagline}`,
  },
  {
    name: "apple-itunes-app",
    content: "app-id=G76836P2D4.com.sharemystack",
    // "app-id=G76836P2D4.com.sharemystack, app-clip-bundle-id=G76836P2D4.com.sharemystack.Clip, app-clip-display=card",
  },
  {
    property: "og:type",
    content: "website",
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
  {
    property: "twitter:site",
    content: "@sharemystack",
  },
  {
    property: "twitter:creator",
    content: "@bndkt",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon.png",
  },
];

export default function App() {
  return (
    <html lang="en" className={clsx("h-full bg-gray-50 antialiased")}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col">
        <div className="flex min-h-full flex-col">
          <Header />
          <main className="flex-auto">
            <Outlet />
          </main>
          <Footer />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
