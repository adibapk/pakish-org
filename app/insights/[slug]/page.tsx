import { InsightArticlePage } from "@/components/insights/insight-article-page";
import { getInsightBySlug, getInsightSlugs } from "@/lib/insights/utils";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface InsightPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: InsightPageProps): Metadata {
  const article = getInsightBySlug(params.slug);

  if (!article) {
    return {
      title: "Insight Not Found | Pakish.ORG",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    absoluteTitle: true,
    keywords: article.tags,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
    tags: article.tags,
  });
}

export default function InsightSlugPage({ params }: InsightPageProps) {
  const article = getInsightBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return <InsightArticlePage article={article} />;
}
