export type InsightCategory =
  | "achievement"
  | "women-in-tech"
  | "freelancing"
  | "generative-ai"
  | "pakistan";

export type InsightBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "ul"; items: string[] };

export interface InsightFaq {
  question: string;
  answer: string;
}

export interface ExternalSource {
  title: string;
  url: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  directAnswer: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: InsightCategory;
  tags: string[];
  externalSources?: ExternalSource[];
  sections: InsightBlock[];
  faq?: InsightFaq[];
}
