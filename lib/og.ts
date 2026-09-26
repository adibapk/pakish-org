export interface OgCard {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
}

export const OG_CARDS: Record<string, OgCard> = {
  home: {
    eyebrow: "Professional technology training",
    title: "Professional IT & AI Courses in Pakistan",
    description: "Karachi · Live online · Team training",
    accent: "#34d399",
  },
  admission: {
    eyebrow: "Pakish Institute admission",
    title: "Apply for Professional IT & AI Courses",
    description: "Course counseling · Transparent fees · Academy access",
    accent: "#5eead4",
  },
  privacy: {
    eyebrow: "Trust & transparency",
    title: "How Pakish Institute Handles Application Information",
    description: "Clear choices for admission and fee-support review",
    accent: "#a7f3d0",
  },
  "womens-empowerment": {
    eyebrow: "Pakish Institute initiative",
    title: "Women's Empowerment Through Digital Skills",
    description: "Gatherings · Mentorship · Limited fee support",
    accent: "#86efac",
  },
  "payment-methods": {
    eyebrow: "Course fee payment",
    title: "Pay Your Pakish.ORG Course Fees",
    description: "Bank · JazzCash · PayPal · Payoneer",
    accent: "#34d399",
  },
  insights: {
    eyebrow: "Pakish.ORG Insights",
    title: "Women in Tech, AI & Freelancing in Pakistan",
    description: "Practical guides · Sourced stories · Career roadmaps",
    accent: "#86efac",
  },
  "campus-gulshan-e-iqbal": {
    eyebrow: "Gulshan-e-Iqbal · Main University Road",
    title: "IT & AI Courses in Gulshan-e-Iqbal, Karachi",
    description: "Professional training at Pakish Institute",
    accent: "#2dd4bf",
  },
  "campus-lodhran": {
    eyebrow: "Future plan · Lodhran",
    title: "Planned Lodhran Digital Skills Campus",
    description: "Land secured · Planning in progress · Not yet operational",
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
  "courses-ai-productivity": {
    eyebrow: "Pakish Institute course",
    title: "AI Productivity & Automation",
    description: "ChatGPT · Claude · Gemini · Workflow automation",
    accent: "#34d399",
  },
  "courses-ai-business": {
    eyebrow: "Corporate AI training",
    title: "AI for Business & Workplace Automation",
    description: "Customized packages for teams and companies",
    accent: "#5eead4",
  },
  "courses-full-stack-ai-development": {
    eyebrow: "Full stack development",
    title: "Modern Full Stack Web Development with AI",
    description: "React · Next.js · APIs · AI coding assistants",
    accent: "#2dd4bf",
  },
  "courses-wordpress-woocommerce": {
    eyebrow: "WordPress professional track",
    title: "WordPress & WooCommerce Development",
    description: "Business sites · Stores · Client delivery",
    accent: "#86efac",
  },
  "courses-cloud-devops": {
    eyebrow: "Cloud & operations",
    title: "Cloud, Servers & DevOps Fundamentals",
    description: "Linux · VPS · DNS · SSL · Deployment",
    accent: "#84cc16",
  },
  "courses-ai-freelancing": {
    eyebrow: "Digital career track",
    title: "AI-Powered Freelancing Career",
    description: "Proposals · Portfolio · AI-assisted delivery",
    accent: "#a7f3d0",
  },
};

export function ogImagePath(key: string): string {
  return `/og/${key}.png`;
}
