import { Model, Q, Relation } from "@nozbe/watermelondb";
import { immutableRelation, lazy, text } from "@nozbe/watermelondb/decorators";

import { Pick } from "./Pick";
import { TableName } from "./schema";

export class Stack extends Model {
  static table = TableName.STACKS;

  static associations = {
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "stack_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("twitter_image_url") twitter_image_url!: string;
  @text("website") website!: string;
  @text("twitter") twitter!: string;
  @text("starred") starred!: boolean;
  @text("stars") stars!: number;
  @text("user_id") user!: string;

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("stack_id", this.id));
}
