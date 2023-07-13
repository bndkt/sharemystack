import { useState } from "react";
import { json } from "@remix-run/cloudflare";
import type {
  V2_MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

import stylesheet from "./tailwind.css";
import { Database } from "./lib/database.types";
import { Header } from "./components/Header";

export const meta: V2_MetaFunction = () => [
  {
    charset: "utf-8",
  },
  {
    name: "title",
    content:
      "Share My Stack - Share your personal productivity stack with the world!",
  },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
  {
    name: "apple-itunes-app",
    content:
      "app-id=G76836P2D4.com.sharemystack, app-clip-bundle-id=G76836P2D4.com.sharemystack.Clip, app-clip-display=card",
  },
];

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

type LoaderData = {
  measurementId: string | undefined;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export const loader: LoaderFunction = async ({ context }) => {
  return json<LoaderData>({
    measurementId: context.MEASUREMENT_ID as string,
    supabaseUrl: context.SUPABASE_URL as string,
    supabaseAnonKey: context.SUPABASE_ANON_KEY as string,
  });
};

export default function App() {
  const { measurementId, supabaseUrl, supabaseAnonKey } =
    useLoaderData<LoaderData>();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  );

  return (
    <html className="h-full antialiased" lang="en">
      <head>
        {measurementId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <script
              async
              id="gtag"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}');`,
              }}
            />
          </>
        )}
        <Meta />
        <Links />
      </head>
      <body className="bg-sharemystack">
        <Header />
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
