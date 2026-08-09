export interface OgCard {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
}

export const OG_CARDS: Record<string, OgCard> = {
  home: {
    eyebrow: "Women-focused technology training",
    title: "IT & AI Courses for Women in Pakistan",
    description: "Karachi · Lodhran · Live online",
    accent: "#34d399",
  },
  admission: {
    eyebrow: "Pakish.ORG admission",
    title: "Start Your IT, AI or Freelancing Journey",
    description: "Regular admission · Need-based support review",
    accent: "#5eead4",
  },
  privacy: {
    eyebrow: "Trust & transparency",
    title: "How Pakish.ORG Handles Application Information",
    description: "Clear choices for WhatsApp, email, and subsidy review",
    accent: "#a7f3d0",
  },
  insights: {
    eyebrow: "Pakish.ORG Insights",
    title: "Women in Tech, AI & Freelancing in Pakistan",
    description: "Practical guides · Sourced stories · Career roadmaps",
    accent: "#86efac",
  },
  "campus-gulshan-e-iqbal": {
    eyebrow: "Gulshan-e-Iqbal · Main University Road",
    title: "AI & IT Courses for Women in Karachi",
    description: "Mentor-led learning at Pakish.ORG",
    accent: "#2dd4bf",
  },
  "campus-lodhran": {
    eyebrow: "Dunyapur · Lodhran",
    title: "IT & AI Courses for Women in South Punjab",
    description: "Practical skills · Local mentorship · Remote careers",
    accent: "#84cc16",
  },
  "sehat-kahani-women-led-healthtech-series-a": {
    eyebrow: "Women-led technology in Pakistan",
    title: "The Sehat Kahani Series A Story",
    description: "A sourced Pakish.ORG insight",
    accent: "#22d3ee",
  },
  "jehan-ara-nest-io-women-in-pakistani-tech": {
    eyebrow: "Pakistan's technology ecosystem",
    title: "Jehan Ara: Building Pathways into Tech",
    description: "A sourced Pakish.ORG insight",
    accent: "#c4b5fd",
  },
  "saira-osama-ai-stroke-care-cerebrocure": {
    eyebrow: "AI for health impact",
    title: "Dr. Saira Osama & Cerebrocure",
    description: "A sourced Pakish.ORG insight",
    accent: "#67e8f9",
  },
  "pakistani-women-wfh-it-freelancing-career-guide": {
    eyebrow: "Practical career guide",
    title: "WFH IT Freelancing for Pakistani Women",
    description: "Skills · Portfolio · Clients · Payment safety",
    accent: "#fbbf24",
  },
  "generative-ai-skills-roadmap-women-pakistan": {
    eyebrow: "Generative AI learning roadmap",
    title: "From ChatGPT Basics to Real AI Projects",
    description: "A practical roadmap for women in Pakistan",
    accent: "#f0abfc",
  },
  "domain-infrastructure-and-women-empowerment": {
    eyebrow: "Portfolio infrastructure",
    title: "Domains, Hosting & Credible Remote Work",
    description: "Turn coursework into live portfolio proof",
    accent: "#93c5fd",
  },
};

export function ogImagePath(key: string): string {
  return `/og/${key}.png`;
}
