/**
 * Course catalog types — CMS-ready and compatible with future
 * Student Portal, LMS, AI Tutor, and dashboard integrations.
 */

export type CourseSlug =
  | "ai-productivity"
  | "ai-business"
  | "full-stack-ai-development"
  | "wordpress-woocommerce"
  | "cloud-devops"
  | "ai-freelancing";

export type CourseCategory =
  | "ai"
  | "web-development"
  | "cloud"
  | "freelancing"
  | "business";

export type CourseLevel = "beginner" | "intermediate" | "all-levels";

export type CoursePricingMode = "starting-from" | "custom-quote";

export interface CoursePricing {
  mode: CoursePricingMode;
  /** Optional display line, e.g. "Starting from PKR 40,000" */
  displayLabel?: string;
  /** Short note under the price / quote label */
  note?: string;
  currency?: "PKR";
  startingAmount?: number;
}

/** LMS lesson unit — progress tracking & AI tutor hooks */
export interface CourseLesson {
  id: string;
  title: string;
  summary?: string;
  order: number;
  estimatedMinutes?: number;
  /** Future: portal content key / markdown path */
  contentKey?: string;
  /** Future: AI tutor lesson prompt id */
  aiTutorPromptId?: string;
}

/** LMS assignment unit */
export interface CourseAssignment {
  id: string;
  title: string;
  description?: string;
  order: number;
  /** Future: submission type for student portal */
  submissionType?: "file" | "link" | "text" | "checklist";
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  estimatedHours?: number;
  lessons: CourseLesson[];
  assignments?: CourseAssignment[];
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CourseSeo {
  title: string;
  description: string;
  keywords: string[];
  /** Open Graph image path placeholder, e.g. /og/courses-ai-productivity.png */
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface Course {
  /** Stable ID for LMS / portal / enrollment APIs */
  id: string;
  slug: CourseSlug;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  level: CourseLevel;
  /** Human-readable duration, e.g. "4–6 weeks" */
  duration: string;
  /** ISO-8601 duration for Course schema, e.g. "P6W" */
  isoDuration: string;
  /** Card / listing summary (short description) */
  summary: string;
  /** Detail-page overview paragraphs (full overview) */
  overview: string[];
  learningOutcomes: string[];
  whoShouldJoin: string[];
  tools: string[];
  curriculum: CourseModule[];
  faq: CourseFaq[];
  pricing: CoursePricing;
  seo: CourseSeo;
  /** Future: LMS course key, enrollment product id, AI tutor prompt id */
  integrations?: {
    lmsCourseId?: string;
    enrollmentProductId?: string;
    aiTutorId?: string;
  };
  /** ISO date for sitemap freshness */
  updatedAt: string;
  published: boolean;
  order: number;
}

export interface CourseCatalogMeta {
  heroHeading: string;
  heroDescription: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
