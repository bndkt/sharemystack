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

export const meta: MetaFunction = () => [
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
  // { rel: "stylesheet", href: "/fonts/inter.woff2" },
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
