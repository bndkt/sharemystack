import {
  json,
  V2_MetaFunction,
  type LinksFunction,
  type LoaderFunction,
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
import { useState } from "react";
import { Database } from "./lib/database.types";
import { Header } from "./components/Header";
import styles from "./tailwind.css";

type LoaderData = {
  measurementId: string | undefined;
  supabaseUrl: string;
  supabaseAnonKey: string;
};

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

declare module "@remix-run/cloudflare" {
  export interface AppLoadContext {
    env: {
      MEASUREMENT_ID: string;
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
    };
  }
}

export const loader: LoaderFunction = async ({ context }) => {
  console.log("LOADER", context.env);

  return json<LoaderData>({
    measurementId: context.env.MEASUREMENT_ID,
    supabaseUrl: context.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: context.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  });
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const { measurementId, supabaseUrl, supabaseAnonKey } =
    useLoaderData<LoaderData>();

  const [supabase] = useState(() =>
    createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
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
