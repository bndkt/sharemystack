import { Model, Q } from "@nozbe/watermelondb";
import { lazy, text } from "@nozbe/watermelondb/decorators";

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
  @text("twitter_image_url") twitterImageUrl!: string;
  @text("website") website!: string;
  @text("twitter") twitter!: string;
  @text("is_starred") isStarred!: boolean;
  @text("is_featured") isFeatured!: boolean;
  @text("number_of_stars") numberOfStars!: number;
  @text("user_id") user!: string;

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("stack_id", this.id));
}
