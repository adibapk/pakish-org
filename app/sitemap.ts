import { SITE_URL, STATIC_ROUTES } from "@/lib/seo";
import { getAllCourses } from "@/lib/courses";
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

  const courseEntries: MetadataRoute.Sitemap = getAllCourses().map(
    (course) => ({
      url: `${SITE_URL}/courses/${course.slug}`,
      lastModified: new Date(course.updatedAt),
      changeFrequency: "monthly",
      priority: 0.85,
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

  return [...staticEntries, ...courseEntries, ...insightEntries];
}
