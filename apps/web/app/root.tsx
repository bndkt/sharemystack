import { MetaFunction, type LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Header } from "./components/Header";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => [
  {
    name: "title",
    content:
      "Share My Stack - Share your personal productivity stack with the world!",
  },
  {
    name: "apple-itunes-app",
    content:
      "app-id=G76836P2D4.com.sharemystack, app-clip-bundle-id=G76836P2D4.com.sharemystack.Clip, app-clip-display=card",
  },
];

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-sms">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
