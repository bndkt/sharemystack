import { Model, Q } from "@nozbe/watermelondb";
import { date, lazy, readonly, text } from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { TableName } from "./schema";

export class StackType extends Model {
  static table = TableName.STACK_TYPES;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.STACK_TYPE_CATEGORIES]: {
      type: "has_many" as const,
      foreignKey: "stack_type_id",
    },
    [TableName.STACKS]: {
      type: "has_many" as const,
      foreignKey: "stack_type_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("icon_name") iconName!: string;
  @text("is_coming_soon") isComingSoon!: boolean;
  // @text("number_of_stacks") numberOfStacks!: number;

  @lazy
  categories = this.collections
    .get<Category>(TableName.CATEGORIES)
    .query(Q.on(TableName.STACK_TYPE_CATEGORIES, "stack_type_id", this.id));
}
