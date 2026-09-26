import type { CourseSlug } from "@/lib/courses/types";

export interface CourseGoal {
  id: string;
  title: string;
  description: string;
  courseSlugs: CourseSlug[];
  href: string;
}

export const COURSE_GOAL_IDS = [
  "ai-productivity",
  "web-wordpress-cloud",
  "freelancing-digital-business",
] as const;

export type CourseGoalId = (typeof COURSE_GOAL_IDS)[number];

export function isValidCourseGoalId(value: string | undefined): value is CourseGoalId {
  return COURSE_GOAL_IDS.includes(value as CourseGoalId);
}

export function getCourseGoalById(id: string | undefined): CourseGoal | undefined {
  if (!isValidCourseGoalId(id)) return undefined;
  return COURSE_GOALS.find((goal) => goal.id === id);
}

export const COURSE_GOALS: CourseGoal[] = [
  {
    id: "ai-productivity",
    title: "AI & Productivity",
    description:
      "Use modern AI tools for research, writing, automation, and workplace productivity — for individuals and teams.",
    courseSlugs: ["ai-productivity", "ai-business"],
    href: "/courses?goal=ai-productivity",
  },
  {
    id: "web-wordpress-cloud",
    title: "Web, WordPress & Cloud",
    description:
      "Build websites, stores, and cloud deployments with practical full-stack, WordPress, and DevOps skills.",
    courseSlugs: [
      "full-stack-ai-development",
      "wordpress-woocommerce",
      "cloud-devops",
    ],
    href: "/courses?goal=web-wordpress-cloud",
  },
  {
    id: "freelancing-digital-business",
    title: "Freelancing & Digital Business",
    description:
      "Launch or grow a digital career with AI-assisted freelancing, proposals, portfolios, and client delivery.",
    courseSlugs: ["ai-freelancing"],
    href: "/courses?goal=freelancing-digital-business",
  },
];
