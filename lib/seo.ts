import type { Metadata } from "next";
import { SITE_LOGO } from "@/lib/site-icons";

export const SITE_URL = "https://pakish.org";
export const SITE_NAME = "Pakish.ORG";

export { SITE_LOGO };

export const DEFAULT_DESCRIPTION =
  "Build practical skills in AI, web development, WordPress, cloud and freelancing through live online, campus and team training at Pakish Institute.";

export const DEFAULT_OG_IMAGE = "/og/home.png";

export const STATIC_ROUTES = [
  { path: "/", updatedAt: "2026-08-08", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/admission", updatedAt: "2026-09-27", changeFrequency: "monthly" as const, priority: 0.95 },
  { path: "/payment-methods", updatedAt: "2026-09-27", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/help", updatedAt: "2026-09-27", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/help/students", updatedAt: "2026-09-27", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/help/teachers", updatedAt: "2026-09-27", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/courses", updatedAt: "2026-09-25", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/insights", updatedAt: "2026-08-08", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/campus/gulshan-e-iqbal", updatedAt: "2026-09-26", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/privacy", updatedAt: "2026-09-26", changeFrequency: "yearly" as const, priority: 0.3 },
  {
    path: "/womens-empowerment",
    updatedAt: "2026-09-26",
    changeFrequency: "monthly" as const,
    priority: 0.75,
  },
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  absoluteTitle = false,
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
      ...(tags ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
