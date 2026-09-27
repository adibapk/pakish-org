import { ACADEMY_LOGIN_URL } from "@/lib/academy";
import { getAllCourses } from "@/lib/courses";

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
}

export const TRAINING_LINKS: NavLink[] = [
  {
    href: "/campus/gulshan-e-iqbal",
    label: "Karachi Campus",
    description: "In-person IT and AI training at our Gulshan-e-Iqbal campus.",
  },
  {
    href: "/#learning-options",
    label: "Live Online",
    description: "Instructor-led Google Meet classes from anywhere in Pakistan.",
  },
  {
    href: "/admission?training=office-team",
    label: "Team Training",
    description: "Customized workplace and team upskilling programs.",
  },
];

export const DESKTOP_PRIMARY_LINKS: NavLink[] = [
  { href: "/womens-empowerment", label: "Women's Empowerment" },
  { href: "/insights", label: "Insights" },
  {
    href: ACADEMY_LOGIN_URL,
    label: "Academy",
    external: true,
  },
];

export const MOBILE_SUPPORT_LINKS: NavLink[] = [
  { href: "/admission", label: "Apply for Admission" },
  { href: "/help", label: "Help" },
  { href: "/payment-methods", label: "Payment Methods" },
  { href: "/#faq", label: "FAQ" },
];

export function getCourseNavItems() {
  return getAllCourses().map((course) => ({
    href: `/courses/${course.slug}`,
    title: course.shortTitle,
    description: course.summary,
  }));
}

export function resolveNavHref(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }
  if (href.startsWith("http") || href.startsWith("/")) {
    if (href.startsWith("/#") && pathname !== "/") {
      return href;
    }
    return href;
  }
  return href;
}

export function isNavActive(href: string, pathname: string) {
  if (href.startsWith("http")) return false;
  const normalized = resolveNavHref(href, pathname);
  if (normalized.includes("#")) return false;
  if (normalized === "/") return pathname === "/";
  return pathname === normalized || pathname.startsWith(`${normalized}/`);
}
