import { InsightsIndexContent } from "@/components/insights/insights-index-content";
import {
  INSIGHTS_INDEX_DESCRIPTION,
  INSIGHTS_INDEX_TITLE,
  SITE_URL,
} from "@/lib/insights/site";
import { getAllInsights } from "@/lib/insights/utils";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: INSIGHTS_INDEX_TITLE,
  description: INSIGHTS_INDEX_DESCRIPTION,
  path: "/insights",
  absoluteTitle: true,
});

export default function InsightsPage() {
  const articles = getAllInsights();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pakish.ORG Insights",
    description: INSIGHTS_INDEX_DESCRIPTION,
    url: `${SITE_URL}/insights`,
    publisher: {
      "@type": "Organization",
      name: "Pakish.ORG",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/insights/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <InsightsIndexContent />
    </>
  );
}
