import type { InsightArticle } from "@/lib/insights/types";
import { SITE_URL } from "@/lib/insights/site";
import { insightUrl } from "@/lib/insights/utils";
import { DEFAULT_OG_IMAGE, SITE_LOGO, absoluteUrl } from "@/lib/seo";

interface ArticleJsonLdProps {
  article: InsightArticle;
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const url = insightUrl(article.slug);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);
  const logoUrl = absoluteUrl(SITE_LOGO);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [imageUrl],
    author: {
      "@type": "Organization",
      name: article.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Pakish.ORG",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.tags.join(", "),
    articleSection: article.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${SITE_URL}/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: url,
      },
    ],
  };

  const faqSchema =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const schemas = [articleSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
