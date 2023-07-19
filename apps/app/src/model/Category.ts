import { Model, Q } from "@nozbe/watermelondb";
import { lazy, text } from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";

export class Category extends Model {
  static table = TableName.CATEGORIES;

  static associations = {
    [TableName.CATEGORIZATIONS]: {
      type: "has_many" as const,
      foreignKey: "category_id",
    },
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "category_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("icon") icon!: string;
  @text("soon") soon!: boolean;
  @text("tools") numberOfTools!: number;

  @lazy
  tools = this.collections
    .get("tools")
    .query(Q.on("categorizations", "category_id", this.id));
}
