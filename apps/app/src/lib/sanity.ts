import { createClient } from "@sanity/client";

import { config } from "./config";

export const client = createClient({
  projectId: config.sanityProjectId,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-09-21",
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getContentTool(slug: string) {
  let tool = await client.fetch(
    `*[_type == "tool" && slug.current == "${slug}"]{description}[0]`,
  );

  tool ??= {};

  return tool;
}
