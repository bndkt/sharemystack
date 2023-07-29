import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  immutableRelation,
  readonly,
  text,
} from "@nozbe/watermelondb/decorators";

import { TableName } from "./schema";
import { Profile } from "./Profile";

export class Star extends Model {
  static table = TableName.STARS;

  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;

  static associations = {
    [TableName.PROFILES]: { type: "belongs_to" as const, key: "profile_id" },
  };

  @immutableRelation(TableName.PROFILES, "profile_id")
  profile!: Relation<Profile>;

  @text("user_id") userId!: string;
}
