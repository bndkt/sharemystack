import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_PROJECT_ID as string,
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
