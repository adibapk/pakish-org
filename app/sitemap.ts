import { SITE_URL, STATIC_ROUTES } from "@/lib/seo";
import { getAllInsights } from "@/lib/insights/utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, updatedAt, changeFrequency, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: new Date(updatedAt),
      changeFrequency,
      priority,
    })
  );

  const insightEntries: MetadataRoute.Sitemap = getAllInsights().map(
    (article) => ({
      url: `${SITE_URL}/insights/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...insightEntries];
}
