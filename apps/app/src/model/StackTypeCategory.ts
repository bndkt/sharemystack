import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  immutableRelation,
  readonly,
} from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { StackType } from "./StackType";
import { TableName } from "./schema";

export class StackTypeCategory extends Model {
  static table = TableName.STACK_TYPE_CATEGORIES;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.STACK_TYPES]: {
      type: "belongs_to" as const,
      key: "stack_type_id",
    },
    [TableName.CATEGORIES]: { type: "belongs_to" as const, key: "category_id" },
  };

  @immutableRelation("stack", "stack_type_id") tool!: Relation<StackType>;
  @immutableRelation("categories", "category_id") category!: Relation<Category>;
}
