import fs from "node:fs";

const svg = fs
  .readFileSync("public/logo.svg", "utf8")
  .replaceAll('fill="#005a43"', 'class="pakish-logo-wordmark-fill"')
  .replace(/ xmlns:xlink="[^"]*"/, "")
  .replace(/ width="[^"]*"/, "")
  .replace(/ height="[^"]*"/, "")
  .replace(/ zoomAndPan="[^"]*"/, "")
  .replace(/ preserveAspectRatio="[^"]*"/, "")
  .replace(/ version="[^"]*"/, "");

fs.writeFileSync(
  "lib/logo-svg.ts",
  `export const LOGO_SVG_MARKUP = ${JSON.stringify(svg)};\n`
);
