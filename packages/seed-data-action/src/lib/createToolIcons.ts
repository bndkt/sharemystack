import { promises as fs } from "fs";
import path from "path";
import { optimize } from "svgo";

import { supabase } from "./supabase.js";

export async function createToolIcons() {
  const iconsPath =
    process.env.GITHUB_ACTIONS === "true"
      ? "./assets/icons"
      : "../../assets/icons";

  const files = await fs.readdir(iconsPath, {});

  const toolIconRecordIds: { [slug: string]: string } = {};

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const filePath = path.join(iconsPath, file);
      const svgContent = await fs.readFile(filePath, "utf-8");
      const { data: optimizedSvg } = optimize(svgContent, {
        multipass: true,
      });

      const slug = path.basename(file, ".svg");

      const { data: categoryRecords, error } = await supabase
        .from("tool_icons")
        .upsert(
          {
            slug,
            icon_svg: optimizedSvg,
            updated_at: "now()",
            last_modified_at: "now()",
          },
          { onConflict: "slug" }
        )
        .select();

      if (error) console.error(error);

      if (categoryRecords) {
        for (const categoryRecord of categoryRecords) {
          toolIconRecordIds[categoryRecord.slug] = categoryRecord.id;
        }
      }
    }
  }

  return toolIconRecordIds;
}
