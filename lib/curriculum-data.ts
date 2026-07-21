export type CurriculumTrackId = "fast-track" | "professional" | "mastery";

export interface CurriculumModule {
  title: string;
  skills: string[];
}

export interface CurriculumTrack {
  id: CurriculumTrackId;
  title: string;
  duration: string;
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
  income: string;
  description: string;
  trackId: CurriculumTrackId;
}

export const curriculumTracks: CurriculumTrack[] = [
  {
    id: "fast-track",
    title: "1-Month Fast-Track",
    duration: "4 weeks",
    tagline: "Launch your first remote income stream",
    outcome:
      "Earn through micro-tasks, Canva design gigs, and AI-assisted content work while building freelancing confidence.",
    wfhFocus:
      "Set up a home workspace, create platform profiles, and land your first paid micro-projects from Pakistan.",
    enrollmentValue: "1-Month Fast-Track",
    placementFocus:
      "Entry-level remote gigs on Fiverr, Upwork, and direct outreach to local businesses.",
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
    tagline: "Build recurring remote client income",
    outcome:
      "Deliver WordPress sites, social media management, SEO audits, and AI-powered marketing workflows for monthly retainers.",
    wfhFocus:
      "Work with international SMB clients on recurring contracts — ideal for women balancing family and flexible hours.",
    enrollmentValue: "3-Month Advanced",
    placementFocus:
      "Remote digital marketer, SMM specialist, WordPress freelancer, and agency support roles.",
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
    tagline: "Master high-ticket global tech freelancing",
    outcome:
      "Ship production Next.js applications with Generative AI features — competing for international developer contracts.",
    wfhFocus:
      "Target global clients needing modern web apps, API integrations, and AI features — the highest remote earning tier.",
    enrollmentValue: "6-Month Pro Developer",
    placementFocus:
      "Junior web developer, AI integration specialist, and product-focused remote engineering roles.",
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
    title: "Karachi Campus (Korangi)",
    description:
      "In-house training at our Korangi Zaman Town campus with mentors, computers, high-speed internet, and a supportive all-women learning environment.",
    href: "/campus/korangi",
    cta: "Visit Karachi Campus",
  },
  {
    icon: "MapPin",
    title: "Lodhran Campus (Dunyapur)",
    description:
      "On-site classes in South Punjab for women who prefer in-person mentorship close to home — same curriculum, local community support.",
    href: "/campus/lodhran",
    cta: "Visit Lodhran Campus",
  },
  {
    icon: "Video",
    title: "Live Online (Zoom & Google Meet)",
    description:
      "Join live instructor-led sessions from anywhere in Pakistan. Perfect for students with mobility constraints or caregiving responsibilities who still want real-time mentorship.",
    cta: "Enroll Online",
  },
];

export const independenceStages: IndependenceStage[] = [
  {
    step: "01",
    title: "First Remote Income",
    timeline: "Month 1",
    income: "$50–$200 / project",
    description:
      "Complete the Fast-Track path to land micro-gigs, build reviews, and prove you can deliver work from home.",
    trackId: "fast-track",
  },
  {
    step: "02",
    title: "Recurring Client Revenue",
    timeline: "Month 3",
    income: "$200–$600 / month",
    description:
      "The Professional track prepares you for monthly retainers in SMM, WordPress, and SEO — stable WFH income.",
    trackId: "professional",
  },
  {
    step: "03",
    title: "High-Ticket Global Contracts",
    timeline: "Month 6",
    income: "$500–$2,000+ / project",
    description:
      "Mastery graduates compete for international development and AI integration projects with premium rates.",
    trackId: "mastery",
  },
];

export function getTrackById(id: CurriculumTrackId): CurriculumTrack | undefined {
  return curriculumTracks.find((track) => track.id === id);
}
