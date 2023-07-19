import { appSchema, tableSchema } from "@nozbe/watermelondb";

export enum TableName {
  TOOLS = "tools",
  CATEGORIES = "categories",
  CATEGORIZATIONS = "categorizations",
}

export const schema = appSchema({
  version: 3,
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
      ],
    }),
    tableSchema({
      name: TableName.CATEGORIZATIONS,
      columns: [
        { name: "tool_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
      ],
    }),
  ],
});
