import { appSchema, tableSchema } from "@nozbe/watermelondb";

export enum TableName {
  TOOLS = "tools",
  CATEGORIES = "categories",
  CATEGORIZATIONS = "categorizations",
  STACKS = "stacks",
  PICKS = "picks",
}

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: TableName.TOOLS,
      columns: [
        { name: "name", type: "string" },
        { name: "slug", type: "string", isIndexed: true },
        { name: "color", type: "string", isOptional: true },
        { name: "icon", type: "string", isOptional: true },
        { name: "website", type: "string", isOptional: true },
        { name: "user_picks", type: "number" },
        { name: "all_picks", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.CATEGORIES,
      columns: [
        { name: "name", type: "string" },
        { name: "slug", type: "string", isIndexed: true },
        { name: "icon", type: "string", isOptional: true },
        { name: "tools", type: "number" },
        { name: "soon", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.CATEGORIZATIONS,
      columns: [
        { name: "tool_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.STACKS,
      columns: [
        { name: "name", type: "string" },
        { name: "slug", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "website", type: "string" },
        { name: "twitter", type: "string" },
        { name: "twitter_image_url", type: "string" },
        { name: "featured", type: "boolean" },
        { name: "starred", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.PICKS,
      columns: [
        { name: "stack_id", type: "string", isIndexed: true },
        { name: "tool_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
