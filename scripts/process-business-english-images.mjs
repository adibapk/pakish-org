/**
 * One-off asset prep for Business English course imagery.
 * Source photos stay outside the repo; only derived WebP outputs are committed.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/courses/business-english");

const PASSPORT_SOURCE = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor/projects/c-Users-pakis-My-Projects-pakish-org/assets/c__Users_pakis_AppData_Roaming_Cursor_User_workspaceStorage_6679b796f3e2517113bc0f5cf0143b6d_images_image-2fcff502-ab6a-4411-abcb-11ab9d8eafe2.png"
);

const SOURCES = {
  classroom: path.join(
    process.env.USERPROFILE ?? "",
    "AppData/Local/Temp/codex-clipboard-f1ae0a67-e328-4aac-9ad8-113e030d1f62.png"
  ),
  passport: PASSPORT_SOURCE,
};

async function processClassroom() {
  const existing = path.join(OUT_DIR, "irfan-velmi-classroom.webp");
  try {
    await fs.access(existing);
    const outMeta = await sharp(existing).metadata();
    return {
      file: "irfan-velmi-classroom.webp",
      width: outMeta.width,
      height: outMeta.height,
      skipped: true,
    };
  } catch {
    // regenerate only when source is available
  }

  if (!(await fs.stat(SOURCES.classroom).catch(() => null))) {
    return { file: "irfan-velmi-classroom.webp", skipped: true, reason: "no source" };
  }

  const meta = await sharp(SOURCES.classroom).metadata();
  const width = meta.width ?? 1200;
  const height = meta.height ?? 1600;
  const cropHeight = Math.round(height * 0.48);

  await sharp(SOURCES.classroom)
    .rotate()
    .extract({
      left: Math.round(width * 0.02),
      top: Math.round(height * 0.02),
      width: Math.round(width * 0.96),
      height: cropHeight,
    })
    .resize(1200, 675, { fit: "cover", position: "centre" })
    .modulate({ brightness: 1.03, saturation: 0.95 })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 86, effort: 4 })
    .toFile(path.join(OUT_DIR, "irfan-velmi-classroom.webp"));

  const outMeta = await sharp(
    path.join(OUT_DIR, "irfan-velmi-classroom.webp")
  ).metadata();
  return {
    file: "irfan-velmi-classroom.webp",
    width: outMeta.width,
    height: outMeta.height,
  };
}

async function processPortrait() {
  await sharp(SOURCES.passport)
    .rotate()
    .resize(640, 800, { fit: "cover", position: "centre" })
    .modulate({ brightness: 1.02, saturation: 0.92 })
    .sharpen({ sigma: 0.45 })
    .webp({ quality: 88, effort: 4 })
    .toFile(path.join(OUT_DIR, "irfan-velmi-portrait.webp"));

  const outMeta = await sharp(
    path.join(OUT_DIR, "irfan-velmi-portrait.webp")
  ).metadata();
  return {
    file: "irfan-velmi-portrait.webp",
    width: outMeta.width,
    height: outMeta.height,
  };
}

await fs.mkdir(OUT_DIR, { recursive: true });
const classroom = await processClassroom();
const portrait = await processPortrait();
console.log(JSON.stringify({ classroom, portrait }, null, 2));
