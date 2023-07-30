import { Model, Q } from "@nozbe/watermelondb";
import {
  date,
  lazy,
  readonly,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";

import { Stack } from "./Stack";
import { Star } from "./Star";
import { TableName } from "./schema";
import { StackType } from "./StackType";

export class Profile extends Model {
  static table = TableName.PROFILES;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.STACKS]: {
      type: "has_many" as const,
      foreignKey: "profile_id",
    },
    [TableName.STARS]: {
      type: "has_many" as const,
      foreignKey: "profile_id",
    },
  };

  @text("name") name!: string;
  @text("slug") slug!: string;
  @text("description") description!: string;
  @text("image") image!: string;
  @text("website") website!: string;
  @text("twitter") twitter!: string;
  @text("twitter_image_url") twitterImageUrl!: string;
  @text("youtube") youtube!: string;
  @text("is_featured") isFeatured!: boolean;
  @text("number_of_stars") numberOfStars!: number;
  @text("user_id") userId!: string;

  @lazy
  stacks = this.collections
    .get<Stack>(TableName.STACKS)
    .query(Q.where("profile_id", this.id));

  @lazy
  stars = this.collections
    .get<Star>(TableName.STARS)
    .query(Q.where("stack_id", this.id));

  @writer async addStar(userId: string) {
    const star = await this.collections
      .get<Star>(TableName.STARS)
      .create((star) => {
        star.profile.set(this);
        star.userId = userId;
      });

    return star;
  }

  @writer async removeStar() {
    await this.stars.markAllAsDeleted();
  }

  @writer async addStack(stackType: StackType) {
    const newStack = await this.collections
      .get<Stack>(TableName.STACKS)
      .create((stack) => {
        stack.profile.set(this);
        stack.stackType.set(stackType);
        stack.stackTypeName = stackType.name;
        stack.stackTypeSlug = stackType.slug;
        stack.stackTypeIconName = stackType.iconName;
      });
    return newStack;
  }
}
