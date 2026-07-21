import { SITE_URL, STATIC_ROUTES } from "@/lib/seo";
import { getInsightSlugs } from "@/lib/insights/utils";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  const insightEntries: MetadataRoute.Sitemap = getInsightSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticEntries, ...insightEntries];
}
