import { Model, Q } from "@nozbe/watermelondb";
import { lazy, text, writer } from "@nozbe/watermelondb/decorators";

import { Category } from "./Category";
import { Pick } from "./Pick";
import { Star } from "./Star";
import { Tool } from "./Tool";
import { TableName } from "./schema";

export class Stack extends Model {
  static table = TableName.STACKS;

  static associations = {
    [TableName.PICKS]: {
      type: "has_many" as const,
      foreignKey: "stack_id",
    },
    [TableName.STARS]: {
      type: "has_many" as const,
      foreignKey: "stack_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("twitter_image_url") twitterImageUrl!: string;
  @text("website") website!: string;
  @text("twitter") twitter!: string;
  // @text("is_starred") isStarred!: boolean;
  @text("is_featured") isFeatured!: boolean;
  @text("number_of_stars") numberOfStars!: number;
  @text("user_id") user!: string;

  @lazy
  picks = this.collections
    .get<Pick>(TableName.PICKS)
    .query(Q.where("stack_id", this.id));

  @lazy
  stars = this.collections
    .get<Star>(TableName.STARS)
    .query(Q.where("stack_id", this.id));

  @writer async addPick(tool: Tool, category: Category) {
    const newPick = await this.collections.get<Pick>("picks").create((pick) => {
      pick.stack.set(this);
      pick.tool.set(tool);
      pick.category.set(category);
    });
    return newPick;
  }

  @writer async removePick(pick: Pick) {
    // const newPick = await this.collections.get<Pick>("picks").find(pick.id);
    pick.markAsDeleted();
    // return newPick;
  }

  @writer async addStar(userId: string) {
    const star = await this.collections.get<Star>("stars").create((star) => {
      star.stack.set(this);
      star.userId = userId;
    });

    return star;
  }

  @writer async removeStar() {
    await this.stars.markAllAsDeleted();
  }
}
