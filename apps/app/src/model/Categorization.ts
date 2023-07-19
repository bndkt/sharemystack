import { Model, Relation } from "@nozbe/watermelondb";
import { immutableRelation } from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Categorization extends Model {
  static table = TableName.CATEGORIZATIONS;

  static associations = {
    [TableName.TOOLS]: { type: "belongs_to" as const, key: "tool_id" },
    [TableName.CATEGORIES]: { type: "belongs_to" as const, key: "category_id" },
  };

  @immutableRelation("tools", "tool_id") tool!: Relation<Tool>;
  @immutableRelation("categories", "category_id") category!: Relation<Category>;
}
