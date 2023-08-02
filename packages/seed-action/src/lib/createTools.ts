import { supabase } from "./supabase.js";
import { tools } from "./data.js";
import { RecordIds } from "../types/types.js";

export async function createTools(
  toolIconRecordIds: RecordIds,
  categoryRecordIds: RecordIds
) {
  const toolRecordIds: RecordIds = {};

  for (const slug of Object.keys(tools)) {
    const tool = tools[slug];

    const { data: toolRecords, error } = await supabase
      .from("tools")
      .upsert(
        {
          slug,
          name: tool.name,
          tool_icon_id: toolIconRecordIds[slug] ?? null,
          color: tool.color,
          website: tool.website,
          app_store: tool.appStore,
          affiliate_link: tool.affiliateLink,
          updated_at: "now()",
          last_modified_at: "now()",
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) console.error(error);

    if (toolRecords) {
      const toolRecord = toolRecords[0].id;
      toolRecordIds[slug] = toolRecord.id;

      for (const categorySlug of tool.categories) {
        const stackTypesSlug = `${categorySlug}-${slug}`;

        if (categoryRecordIds[categorySlug]) {
          await supabase
            .from("categorizations")
            .upsert(
              {
                slug: stackTypesSlug,
                category_id: categoryRecordIds[categorySlug],
                tool_id: toolRecord.id,
                updated_at: "now()",
                last_modified_at: "now()",
              },
              { onConflict: "slug" }
            )
            .select();
        }
      }
    }
  }

  return toolRecordIds;
}
