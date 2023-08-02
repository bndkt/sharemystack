import { supabase } from "./supabase.js";
import { categories } from "./data.js";

export function createCategories() {
  Object.keys(categories).forEach(async (slug) => {
    const category = categories[slug];

    const { data: categoryRecord, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug,
          name: category.name,
          icon_name: category.iconName,
          is_coming_soon: category.isComingSoon,
          updated_at: "now()",
          last_modified_at: "now()",
        },
        { onConflict: "slug" }
      )
      .select();

    if (error) console.error(error);

    if (categoryRecord) {
      category.stackTypes.forEach(async (stackTypeSlug) => {
        const stackTypesSlug = `${stackTypeSlug}-${slug}`;
        const { data: stackTypeRecord, error } = await supabase
          .from("stack_types")
          .select("id")
          .eq("slug", stackTypeSlug);
        if (error) console.error(error);

        if (stackTypeRecord) {
          const { data: stackTypeCategoryRecord, error } = await supabase
            .from("stack_type_categories")
            .upsert(
              {
                slug: stackTypesSlug,
                stack_type_id: stackTypeRecord[0].id,
                category_id: categoryRecord[0].id,
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
