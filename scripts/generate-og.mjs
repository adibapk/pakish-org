import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const cards = {
  home: ["Women-focused technology training", "IT & AI Courses for Women in Pakistan", "Karachi · Lodhran · Live online", "#34d399"],
  admission: ["Pakish.ORG admission", "Start Your IT, AI or Freelancing Journey", "Regular admission · Need-based support review", "#5eead4"],
  privacy: ["Trust & transparency", "How Pakish.ORG Handles Application Information", "Clear choices for WhatsApp, email, and subsidy review", "#a7f3d0"],
  insights: ["Pakish.ORG Insights", "Women in Tech, AI & Freelancing in Pakistan", "Practical guides · Sourced stories · Career roadmaps", "#86efac"],
  "campus-gulshan-e-iqbal": ["Gulshan-e-Iqbal · Main University Road", "AI & IT Courses for Women in Karachi", "Mentor-led learning at Pakish.ORG", "#2dd4bf"],
  "campus-lodhran": ["Dunyapur · Lodhran", "IT & AI Courses for Women in South Punjab", "Practical skills · Local mentorship · Remote careers", "#84cc16"],
  "sehat-kahani-women-led-healthtech-series-a": ["Women-led technology in Pakistan", "The Sehat Kahani Series A Story", "A sourced Pakish.ORG insight", "#22d3ee"],
  "jehan-ara-nest-io-women-in-pakistani-tech": ["Pakistan's technology ecosystem", "Jehan Ara: Building Pathways into Tech", "A sourced Pakish.ORG insight", "#c4b5fd"],
  "saira-osama-ai-stroke-care-cerebrocure": ["AI for health impact", "Dr. Saira Osama & Cerebrocure", "A sourced Pakish.ORG insight", "#67e8f9"],
  "pakistani-women-wfh-it-freelancing-career-guide": ["Practical career guide", "WFH IT Freelancing for Pakistani Women", "Skills · Portfolio · Clients · Payment safety", "#fbbf24"],
  "generative-ai-skills-roadmap-women-pakistan": ["Generative AI learning roadmap", "From ChatGPT Basics to Real AI Projects", "A practical roadmap for women in Pakistan", "#f0abfc"],
  "domain-infrastructure-and-women-empowerment": ["Portfolio infrastructure", "Domains, Hosting & Credible Remote Work", "Turn coursework into live portfolio proof", "#93c5fd"],
};

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

function wrapTitle(title, maxLength = 32) {
  const words = title.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function createSvg([eyebrow, title, description, accent]) {
  const lines = wrapTitle(title, title.length > 44 ? 29 : 32);
  const fontSize = lines.length > 2 ? 54 : 64;
  const lineHeight = Math.round(fontSize * 1.04);
  const titleSpans = lines
    .map(
      (line, index) =>
        `<tspan x="84" y="${300 + index * lineHeight}">${escapeXml(line)}</tspan>`
    )
    .join("");
  const descriptionY = 300 + lines.length * lineHeight + 28;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#06110d"/>
          <stop offset="0.55" stop-color="#0b1f17"/>
          <stop offset="1" stop-color="#10281d"/>
        </linearGradient>
        <radialGradient id="glow" cx="82%" cy="15%" r="45%">
          <stop offset="0" stop-color="#10b981" stop-opacity="0.28"/>
          <stop offset="1" stop-color="#10b981" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect width="1200" height="630" fill="url(#glow)"/>
      <rect x="30" y="54" width="1140" height="522" rx="32" fill="url(#grid)" stroke="#a7f3d0" stroke-opacity="0.2"/>
      <rect x="82" y="102" width="52" height="52" rx="13" fill="${accent}"/>
      <text x="108" y="139" text-anchor="middle" fill="#052e1d" font-family="Arial, sans-serif" font-size="28" font-weight="900">P</text>
      <text x="149" y="139" fill="#f8fafc" font-family="Arial, sans-serif" font-size="28" font-weight="800">Pakish.ORG</text>
      <text x="84" y="215" fill="${accent}" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="1.7">${escapeXml(eyebrow.toUpperCase())}</text>
      <text fill="#f8fafc" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="800" letter-spacing="-2">${titleSpans}</text>
      <text x="84" y="${descriptionY}" fill="#b8cfc4" font-family="Arial, sans-serif" font-size="27">${escapeXml(description)}</text>
      <rect x="788" y="471" width="270" height="56" rx="28" fill="none" stroke="${accent}" stroke-width="2"/>
      <text x="923" y="507" text-anchor="middle" fill="${accent}" font-family="Arial, sans-serif" font-size="19" font-weight="700">Learn skills. Build proof.</text>
    </svg>`;
}

const outputDirectory = path.resolve("public", "og");
await fs.mkdir(outputDirectory, { recursive: true });

for (const [key, card] of Object.entries(cards)) {
  const output = path.join(outputDirectory, `${key}.png`);
  await sharp(Buffer.from(createSvg(card)))
    .png({ compressionLevel: 9, palette: true })
    .toFile(output);
  console.log(`generated ${path.relative(process.cwd(), output)}`);
}
