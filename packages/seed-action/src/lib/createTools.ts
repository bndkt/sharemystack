import { supabase } from "./supabase.js";
import { tools } from "./data.js";

export function createTools() {
  Object.keys(tools).forEach(async (slug) => {
    const tool = tools[slug];

    const iconSvg = "tbd";

    const { data: toolRecord, error } = await supabase
      .from("tools")
      .upsert(
        {
          slug,
          name: tool.name,
          icon_svg: iconSvg,
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

    if (toolRecord) {
      tool.categories.forEach(async (categorySlug) => {
        const stackTypesSlug = `${categorySlug}-${slug}`;
        console.log(stackTypesSlug);
        const { data: categoryRecord, error } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug);
        if (error) console.error(error);

        if (categoryRecord) {
          const { data: categorizationRecord, error } = await supabase
            .from("categorizations")
            .upsert(
              {
                slug: stackTypesSlug,
                category_id: categoryRecord[0].id,
                tool_id: toolRecord[0].id,
                updated_at: "now()",
                last_modified_at: "now()",
              },
              { onConflict: "slug" }
            )
            .select();
          if (error) console.error(error);
        }
      });
    }
  });
}
