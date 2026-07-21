import { insightArticles } from "./articles";
import type { InsightArticle } from "./types";
import { SITE_URL } from "./site";

export function getAllInsights(): InsightArticle[] {
  return [...insightArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insightArticles.find((article) => article.slug === slug);
}

export function getInsightSlugs(): string[] {
  return insightArticles.map((article) => article.slug);
}

export function getRelatedInsights(
  currentSlug: string,
  limit = 3
): InsightArticle[] {
  const current = getInsightBySlug(currentSlug);
  if (!current) return getAllInsights().slice(0, limit);

  return getAllInsights()
    .filter((article) => article.slug !== currentSlug)
    .sort((a, b) => {
      const aScore =
        (a.category === current.category ? 2 : 0) +
        a.tags.filter((tag) => current.tags.includes(tag)).length;
      const bScore =
        (b.category === current.category ? 2 : 0) +
        b.tags.filter((tag) => current.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function insightUrl(slug?: string): string {
  return slug ? `${SITE_URL}/insights/${slug}` : `${SITE_URL}/insights`;
}

export function formatInsightDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function categoryLabel(category: InsightArticle["category"]): string {
  const labels: Record<InsightArticle["category"], string> = {
    achievement: "Achievement Story",
    "women-in-tech": "Women in Tech",
    freelancing: "Freelancing Guide",
    "generative-ai": "Generative AI",
    pakistan: "Pakistan",
  };
  return labels[category];
}
