import { supabase } from "./supabase.js";
import { profiles } from "./data.js";
import { RecordIds } from "../types/types.js";

export async function createProfiles({
  stackTypeRecordIds,
  toolRecordIds,
  categoryRecordIds,
}: {
  stackTypeRecordIds: RecordIds;
  toolRecordIds: RecordIds;
  categoryRecordIds: RecordIds;
}) {
  const profileRecordIds: RecordIds = {};

  for (const slug of Object.keys(profiles)) {
    const profile = profiles[slug];

    const { data: profileRecords } = await supabase
      .from("profiles")
      .upsert(
        {
          slug,
          name: profile.name,
          description: profile.description,
          // image: profile.image,
          website: profile.website,
          twitter: profile.twitter,
          twitter_image_url: profile.twitter_image_url,
          youtube: profile.youtube,
          is_featured: profile.is_featured,
          updated_at: "now()",
          last_modified_at: "now()",
        },
        { onConflict: "slug" }
      )
      .select();

    if (profileRecords && profile.stacks) {
      const profileRecord = profileRecords[0];
      profileRecordIds[slug] = profileRecord.id;

      for (const stack of profile.stacks) {
        const { data: stackRecords } = await supabase
          .from("stacks")
          .upsert(
            {
              slug: `${slug}-${stack.stackType}`,
              profile_id: profileRecord.id,
              stack_type_id: stackTypeRecordIds[stack.stackType],
            },
            { onConflict: "slug" }
          )
          .select();

        if (stackRecords) {
          for (const pick of stack.picks) {
            const stackRecord = stackRecords[0];

            await supabase
              .from("picks")
              .upsert(
                {
                  slug: `${slug}-${stack.stackType}-${pick.tool}`,
                  stack_id: stackRecord.id,
                  category_id: categoryRecordIds[pick.category],
                  tool_id: toolRecordIds[pick.tool],
                },
                { onConflict: "slug" }
              )
              .select();
          }
        }
      }
    }
  }

  return profileRecordIds;
}
