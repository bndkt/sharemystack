import { defineConfig, isDev } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

const devOnlyPlugins = [getStartedPlugin()];

export default defineConfig({
  name: "default",
  title: "Share My Stack",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: "production",

  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
});
