import { ACADEMY_LOGIN_URL } from "@/lib/academy";
import { getAllCourses } from "@/lib/courses";
import { STATIC_ROUTES } from "@/lib/seo";
import {
  DESKTOP_PRIMARY_LINKS,
  MOBILE_SUPPORT_LINKS,
  TRAINING_LINKS,
  getCourseNavItems,
} from "./site-nav";

/** Section IDs rendered on the current homepage (`app/page.tsx`). */
export const HOMEPAGE_ANCHOR_IDS = new Set([
  "tech-trust",
  "courses",
  "features",
  "learning-options",
  "enrollment",
  "proof",
  "initiatives",
  "contact",
  "faq",
  "footer",
]);

/** Anchors that exist in retained components but are intentionally not on the homepage. */
export const RETIRED_HOMEPAGE_ANCHOR_IDS = new Set(["team", "glimpses"]);

export const PUBLIC_ROUTE_PATHS = new Set([
  ...STATIC_ROUTES.map((route) => route.path),
  ...getAllCourses().map((course) => `/courses/${course.slug}`),
  "/campus/korangi",
  "/campus/lodhran",
]);

export interface NavHrefSource {
  href: string;
  label: string;
  source: string;
}

function stripQueryAndHash(href: string): string {
  const withoutHash = href.split("#")[0] ?? href;
  return withoutHash.split("?")[0] ?? withoutHash;
}

export function parseInternalHref(href: string): {
  pathname: string;
  hash: string | null;
} {
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    throw new Error(`External href is not internal: ${href}`);
  }

  const hashIndex = href.indexOf("#");
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : null;
  const withoutQuery = (rawPath.split("?")[0] ?? rawPath) || "/";
  const pathname = withoutQuery === "" ? "/" : withoutQuery;

  return { pathname, hash };
}

export function collectPublicNavHrefs(): NavHrefSource[] {
  const footerLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/admission", label: "Admission" },
    { href: "/payment-methods", label: "Payment Methods" },
    { href: "/womens-empowerment", label: "Women's Empowerment" },
    { href: ACADEMY_LOGIN_URL, label: "Academy Login" },
    { href: "/insights", label: "Insights" },
    { href: "/privacy", label: "Privacy" },
    { href: "/#contact", label: "Contact" },
    { href: "/#faq", label: "FAQ" },
  ];

  const sources: NavHrefSource[] = [
    ...footerLinks.map((link) => ({ ...link, source: "footer" })),
    ...TRAINING_LINKS.map((link) => ({ ...link, source: "training-nav" })),
    ...DESKTOP_PRIMARY_LINKS.map((link) => ({ ...link, source: "desktop-primary" })),
    ...MOBILE_SUPPORT_LINKS.map((link) => ({ ...link, source: "mobile-support" })),
    ...getCourseNavItems().map((item) => ({
      href: item.href,
      label: item.title,
      source: "courses-nav",
    })),
  ];

  return sources;
}

export interface LinkValidationIssue {
  href: string;
  source: string;
  reason: string;
}

export function validatePublicNavHrefs(
  hrefs: NavHrefSource[] = collectPublicNavHrefs()
): LinkValidationIssue[] {
  const issues: LinkValidationIssue[] = [];

  for (const entry of hrefs) {
    const { href, source } = entry;

    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    const { pathname, hash } = parseInternalHref(href);
    const normalizedPath = stripQueryAndHash(pathname);

    if (!PUBLIC_ROUTE_PATHS.has(normalizedPath)) {
      issues.push({
        href,
        source,
        reason: `Unknown public route: ${normalizedPath}`,
      });
      continue;
    }

    if (!hash) continue;

    if (RETIRED_HOMEPAGE_ANCHOR_IDS.has(hash)) {
      issues.push({
        href,
        source,
        reason: `Retired homepage anchor #${hash} must not be linked while section is hidden`,
      });
      continue;
    }

    if (normalizedPath === "/" && !HOMEPAGE_ANCHOR_IDS.has(hash)) {
      issues.push({
        href,
        source,
        reason: `Missing homepage anchor #${hash}`,
      });
    }
  }

  return issues;
}
