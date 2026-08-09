import { InsightArticlePage } from "@/components/insights/insight-article-page";
import { getInsightBySlug, getInsightSlugs } from "@/lib/insights/utils";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

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
    image: ogImagePath(article.slug),
    type: "article",
    absoluteTitle: true,
    keywords: article.tags,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
    tags: article.tags,
  });
}

export default async function InsightSlugPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return <InsightArticlePage article={article} />;
}
