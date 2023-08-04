import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";
import { encode } from "blurhash";

import { supabase } from "./supabase.js";
import { RecordIds } from "../types/types.js";

export async function createProfileImages({
  profileRecordIds,
}: {
  profileRecordIds: RecordIds;
}) {
  const imagesPath =
    process.env.GITHUB_ACTIONS === "true"
      ? "./assets/images/profiles"
      : "../../assets/images/profiles";

  const files = await fs.readdir(imagesPath, {});

  for (const file of files) {
    if (path.extname(file) === ".webp") {
      const filePath = path.join(imagesPath, file);

      const imageFile = await fs.readFile(filePath, "utf-8");
      const slug = path.basename(file, ".webp");

      const { error } = await supabase.storage
        .from("public-images")
        .upload(`profiles/${file}`, imageFile, {
          cacheControl: "3600",
          upsert: true,
        });

      const { width, height } = await sharp(filePath).metadata();
      const buffer = await sharp(filePath)
        .raw()
        .ensureAlpha()
        // .resize(metadata.width, metadata.height, { fit: "inside" })
        .toBuffer();
      const blurhash = encode(
        new Uint8ClampedArray(buffer),
        width ?? 800,
        height ?? 600,
        4,
        4
      );

      if (blurhash && profileRecordIds[slug]) {
        await supabase
          .from("profiles")
          .update({ blurhash })
          .match({ id: profileRecordIds[slug] });
      }

      error && console.error(error);
    }
  }

  // return toolIconRecordIds;
}
