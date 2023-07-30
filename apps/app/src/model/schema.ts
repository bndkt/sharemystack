import { appSchema, tableSchema } from "@nozbe/watermelondb";

export enum TableName {
  TOOLS = "tools",
  CATEGORIES = "categories",
  CATEGORIZATIONS = "categorizations",
  PROFILES = "profiles",
  STACK_TYPES = "stack_types",
  STACK_TYPE_CATEGORIES = "stack_type_categories",
  STACKS = "stacks",
  PICKS = "picks",
  STARS = "stars",
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
        { name: "icon_svg", type: "string", isOptional: true },
        { name: "website", type: "string", isOptional: true },
        { name: "affiliate_link", type: "string", isOptional: true },
        { name: "app_store", type: "string", isOptional: true },
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
        { name: "icon_name", type: "string", isOptional: true },
        { name: "number_of_tools", type: "number" },
        { name: "is_coming_soon", type: "boolean" },
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
      name: TableName.STACK_TYPE_CATEGORIES,
      columns: [
        { name: "stack_type_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.PROFILES,
      columns: [
        { name: "user_id", type: "string", isIndexed: true, isOptional: true },
        { name: "name", type: "string" },
        { name: "slug", type: "string", isIndexed: true },
        { name: "description", type: "string", isOptional: true },
        { name: "image", type: "string", isOptional: true },
        { name: "website", type: "string", isOptional: true },
        { name: "twitter", type: "string", isOptional: true },
        { name: "twitter_image_url", type: "string", isOptional: true },
        { name: "youtube", type: "string", isOptional: true },
        { name: "is_featured", type: "boolean" },
        { name: "is_starred", type: "boolean" },
        { name: "number_of_stars", type: "number" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.STACKS,
      columns: [
        { name: "profile_id", type: "string", isIndexed: true },
        { name: "stack_type_id", type: "string", isIndexed: true },
        { name: "stack_type_slug", type: "string", isIndexed: true },
        { name: "stack_type_name", type: "string" },
        { name: "stack_type_icon_name", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.STACK_TYPES,
      columns: [
        { name: "name", type: "string" },
        { name: "slug", type: "string", isIndexed: true },
        { name: "icon_name", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: TableName.PICKS,
      columns: [
        { name: "stack_id", type: "string", isIndexed: true },
        { name: "tool_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "stack_name", type: "string" },
        { name: "stack_slug", type: "string" },
        { name: "tool_name", type: "string" },
        { name: "tool_slug", type: "string" },
        { name: "category_name", type: "string" },
        { name: "category_slug", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: TableName.STARS,
      columns: [
        { name: "profile_id", type: "string", isIndexed: true },
        { name: "tool_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
