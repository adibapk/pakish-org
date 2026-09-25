import { CoursesIndexContent } from "@/components/courses/courses-index-content";
import { getAllCourses } from "@/lib/courses";
import { COURSE_CATALOG_META } from "@/lib/courses/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: COURSE_CATALOG_META.seo.title,
  description: COURSE_CATALOG_META.seo.description,
  path: "/courses",
  absoluteTitle: true,
  keywords: COURSE_CATALOG_META.seo.keywords,
});

export default function CoursesPage() {
  const courses = getAllCourses();
  return <CoursesIndexContent courses={courses} />;
}
