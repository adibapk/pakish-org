/**
 * One-off asset prep for Business English course imagery.
 * Source photos stay outside the repo; only derived WebP outputs are committed.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/images/courses/business-english"
);

const SOURCES = {
  classroom: path.join(
    process.env.USERPROFILE ?? "",
    "AppData/Local/Temp/codex-clipboard-f1ae0a67-e328-4aac-9ad8-113e030d1f62.png"
  ),
  instructor: path.join(
    process.env.USERPROFILE ?? "",
    "Downloads/WhatsApp Image 2026-09-26 at 14.53.36.jpeg"
  ),
};

async function processClassroom() {
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

async function processInstructor() {
  const meta = await sharp(SOURCES.instructor).metadata();
  const width = meta.width ?? 1600;
  const height = meta.height ?? 1200;

  await sharp(SOURCES.instructor)
    .rotate()
    .extract({
      left: Math.round(width * 0.22),
      top: Math.round(height * 0.08),
      width: Math.round(width * 0.38),
      height: Math.round(height * 0.88),
    })
    .resize(800, 1000, { fit: "cover", position: "centre" })
    .modulate({ brightness: 1.02 })
    .sharpen({ sigma: 0.5 })
    .webp({ quality: 86, effort: 4 })
    .toFile(path.join(OUT_DIR, "irfan-velmi-instructor.webp"));

  const outMeta = await sharp(
    path.join(OUT_DIR, "irfan-velmi-instructor.webp")
  ).metadata();
  return {
    file: "irfan-velmi-instructor.webp",
    width: outMeta.width,
    height: outMeta.height,
  };
}

await fs.mkdir(OUT_DIR, { recursive: true });
const classroom = await processClassroom();
const instructor = await processInstructor();
console.log(JSON.stringify({ classroom, instructor }, null, 2));
