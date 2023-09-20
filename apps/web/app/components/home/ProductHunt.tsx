import { config } from "~/lib/config";

export function ProductHunt() {
  return (
    <a
      href="https://www.producthunt.com/posts/share-my-stack?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-share&#0045;my&#0045;stack"
      target="_blank"
      className="flex justify-center lg:justify-start mt-12"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=415351&theme=light"
        alt={`${config.name} - ${config.tagline} | Product Hunt`}
        width="250"
        height="54"
      />
    </a>
  );
}
