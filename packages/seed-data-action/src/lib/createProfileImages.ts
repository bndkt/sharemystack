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

  const imageFileExtensions = [".webp", ".jpg", ".png"];

  for (const file of files) {
    if (imageFileExtensions.includes(path.extname(file))) {
      const filePath = path.join(imagesPath, file);

      const slug = path.basename(file, path.extname(file));
      const image = `${slug}.webp`;

      const sharpImage = sharp(filePath);

      const webpImage = sharpImage.resize(430).webp();

      webpImage.toBuffer(async (err, data, info) => {
        const { error } = await supabase.storage
          .from("public-images")
          .upload(`profiles/${image}`, data, {
            contentType: "image/webp",
            cacheControl: "3600",
            upsert: true,
          });
        (error || err) && console.error(error, err);

        const blurhash = encode(
          new Uint8ClampedArray(
            await sharpImage.raw().ensureAlpha().toBuffer()
          ),
          info.width,
          info.height,
          4,
          4
        );

        if (blurhash && profileRecordIds[slug]) {
          await supabase
            .from("profiles")
            .update({ image, blurhash })
            .match({ id: profileRecordIds[slug] });
        }
      });
    }
  }

  // return toolIconRecordIds;
}
