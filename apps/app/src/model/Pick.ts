import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  immutableRelation,
  readonly,
  text,
} from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Stack } from "./Stack";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Pick extends Model {
  static table = TableName.PICKS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.TOOLS]: { type: "belongs_to" as const, key: "tool_id" },
    [TableName.CATEGORIES]: { type: "belongs_to" as const, key: "category_id" },
    [TableName.STACKS]: { type: "belongs_to" as const, key: "stack_id" },
  };

  @text("profile_name") profileName!: string;
  @text("profile_slug") profileSlug!: string;
  @text("tool_name") toolName!: string;
  @text("tool_slug") toolSlug!: string;
  @text("stack_type_name") stackTypeName!: string;
  @text("stack_type_slug") stackTypeSlug!: string;
  @text("stack_type_icon_name") stackTypeIconName!: string;
  @text("category_name") categoryName!: string;
  @text("category_slug") categorySlug!: string;
  @text("is_featured") isFeatured!: boolean;

  @immutableRelation(TableName.STACKS, "stack_id") stack!: Relation<Stack>;
  @immutableRelation(TableName.TOOLS, "tool_id") tool!: Relation<Tool>;
  @immutableRelation(TableName.CATEGORIES, "category_id")
  category!: Relation<Category>;
}
