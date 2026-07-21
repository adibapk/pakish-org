import type { Metadata } from "next";

export const SITE_URL = "https://pakish.org";
export const SITE_NAME = "Pakish.ORG";

export const DEFAULT_DESCRIPTION =
  "Pakish.ORG empowers women through free and subsidized IT and AI education, training, and community — building Pakistan's next generation of tech leaders.";

export const DEFAULT_OG_IMAGE = "/hero-image-light.jpeg";

export const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/insights", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/campus/korangi", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/campus/lodhran", changeFrequency: "monthly" as const, priority: 0.8 },
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
