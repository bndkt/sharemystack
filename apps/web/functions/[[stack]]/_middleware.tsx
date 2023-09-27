import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";
import { OgImage } from "~/components/OgImage";

interface Props {
  ogTitle: string;
}

export const onRequest = vercelOGPagesPlugin<Props>({
  imagePathSuffix: "/social-image.png",
  component: OgImage,
  extractors: {
    on: {
      'meta[property="og:title"]': (props) => ({
        element(element) {
          props.ogTitle = element.getAttribute("content") ?? "";
        },
      }),
    },
  },
  autoInject: {
    openGraph: false,
  },
});
