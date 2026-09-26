export type CurriculumTrackId = "fast-track" | "professional" | "mastery";

export interface CurriculumModule {
  title: string;
  skills: string[];
}

export interface CurriculumTrack {
  id: CurriculumTrackId;
  title: string;
  duration: string;
  isoDuration: string;
  level: string;
  tagline: string;
  outcome: string;
  wfhFocus: string;
  enrollmentValue: string;
  modules: CurriculumModule[];
  placementFocus: string;
}

export interface LearningMode {
  icon: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}

export interface IndependenceStage {
  step: string;
  title: string;
  timeline: string;
  proof: string;
  description: string;
  trackId: CurriculumTrackId;
}

export const curriculumTracks: CurriculumTrack[] = [
  {
    id: "fast-track",
    title: "1-Month Fast-Track",
    duration: "4 weeks",
    isoDuration: "P4W",
    level: "Beginner",
    tagline: "Build the foundations for your first remote project",
    outcome:
      "Create a starter portfolio with Canva, AI-assisted content, client communication, and safe freelancing workflows.",
    wfhFocus:
      "Set up a home workspace, create platform profiles, and land your first paid micro-projects from Pakistan.",
    enrollmentValue: "1-Month Fast-Track",
    placementFocus:
      "Starter portfolio samples suited to marketplace profiles and focused outreach to local businesses.",
    modules: [
      {
        title: "Freelancing Foundations",
        skills: [
          "Client communication & proposals",
          "Pricing for first projects",
          "Portfolio basics",
          "Payment safety (Payoneer, Wise)",
        ],
      },
      {
        title: "Visual & Content Skills",
        skills: [
          "Canva for social graphics",
          "Brand kits & templates",
          "ChatGPT for captions & emails",
          "Micro-task workflows",
        ],
      },
    ],
  },
  {
    id: "professional",
    title: "3-Month Professional",
    duration: "12 weeks",
    isoDuration: "P12W",
    level: "Beginner to intermediate",
    tagline: "Build repeatable digital-service skills",
    outcome:
      "Build WordPress sites, social media plans, basic SEO audits, and AI-assisted marketing workflows for a client-ready portfolio.",
    wfhFocus:
      "Work with international SMB clients on recurring contracts — ideal for women balancing family and flexible hours.",
    enrollmentValue: "3-Month Professional",
    placementFocus:
      "Portfolio practice for digital marketing, SMM, WordPress, and agency-support opportunities.",
    modules: [
      {
        title: "Web & Marketing Stack",
        skills: [
          "WordPress setup & customization",
          "Social media management (SMM)",
          "Basic on-page SEO",
          "Landing page optimization",
        ],
      },
      {
        title: "AI for Digital Careers",
        skills: [
          "Prompt engineering for marketing",
          "AI content workflows",
          "Client reporting with AI tools",
          "Automation for repetitive tasks",
        ],
      },
    ],
  },
  {
    id: "mastery",
    title: "6-Month Mastery",
    duration: "24 weeks",
    isoDuration: "P24W",
    level: "Intermediate",
    tagline: "Build production-ready web and AI projects",
    outcome:
      "Ship portfolio-ready Next.js applications with APIs, version control, deployment, and responsible Generative AI features.",
    wfhFocus:
      "Target global clients needing modern web apps, API integrations, and AI features — the highest remote earning tier.",
    enrollmentValue: "6-Month Mastery",
    placementFocus:
      "Deployed portfolio projects for junior web, AI integration, and product-focused opportunities.",
    modules: [
      {
        title: "Modern Web Development",
        skills: [
          "Next.js & React fundamentals",
          "API integration & deployment",
          "Version control with Git",
          "Live portfolio deployment",
        ],
      },
      {
        title: "Generative AI Integration",
        skills: [
          "LLM API integration",
          "Cursor Pro & Copilot workflows",
          "AI features in web apps",
          "Client-ready technical documentation",
        ],
      },
    ],
  },
];

export const learningModes: LearningMode[] = [
  {
    icon: "MapPin",
    title: "Karachi Campus — Gulshan-e-Iqbal",
    description:
      "In-center training at our Gulshan-e-Iqbal campus on Main University Road with mentors, computers, and high-speed internet when cohorts are scheduled.",
    href: "/campus/gulshan-e-iqbal",
    cta: "Visit Karachi Campus",
  },
  {
    icon: "Video",
    title: "Live Online (Google Meet)",
    description:
      "Join live instructor-led sessions from anywhere in Pakistan — one-to-one, group, or team formats.",
    cta: "Apply Online",
  },
  {
    icon: "Building2",
    title: "Office / Team Training",
    description:
      "Customized workshops and team upskilling at your workplace or preferred location.",
    cta: "Request Team Training",
  },
];

export const independenceStages: IndependenceStage[] = [
  {
    step: "01",
    title: "Starter Service Portfolio",
    timeline: "Month 1",
    proof: "Starter service portfolio",
    description:
      "Practice a focused service, create samples, and learn how to present your work clearly to a prospective client.",
    trackId: "fast-track",
  },
  {
    step: "02",
    title: "Client-Ready Project Workflow",
    timeline: "Month 3",
    proof: "Client-ready project workflow",
    description:
      "Complete a larger WordPress or marketing project, document the process, and practice scoping and client communication.",
    trackId: "professional",
  },
  {
    step: "03",
    title: "Deployed Technical Portfolio",
    timeline: "Month 6",
    proof: "Deployed technical portfolio",
    description:
      "Deploy a modern web application, demonstrate version control and APIs, and explain where AI adds responsible user value.",
    trackId: "mastery",
  },
];

export function getTrackById(id: CurriculumTrackId): CurriculumTrack | undefined {
  return curriculumTracks.find((track) => track.id === id);
}
