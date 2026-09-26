import { CoursesIndexContent } from "@/components/courses/courses-index-content";
import { getCourseGoalById, isValidCourseGoalId } from "@/lib/course-goals";
import {
  getAllCourses,
  getCoursesByCatalogueGroup,
} from "@/lib/courses";
import { COURSE_CATALOG_META } from "@/lib/courses/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: COURSE_CATALOG_META.seo.title,
  description: COURSE_CATALOG_META.seo.description,
  path: "/courses",
  absoluteTitle: true,
  keywords: COURSE_CATALOG_META.seo.keywords,
});

interface CoursesPageProps {
  searchParams?: Promise<{ goal?: string }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const goalParam = params?.goal;
  const activeGoal = getCourseGoalById(goalParam);
  const invalidGoal = Boolean(goalParam && !isValidCourseGoalId(goalParam));

  const allCourses = getAllCourses();
  const courses = activeGoal
    ? allCourses.filter((course) => activeGoal.courseSlugs.includes(course.slug))
    : allCourses;

  const groupedCourses = activeGoal
    ? undefined
    : {
        "technology-digital": getCoursesByCatalogueGroup("technology-digital"),
        "professional-skills": getCoursesByCatalogueGroup("professional-skills"),
      };

  return (
    <CoursesIndexContent
      courses={courses}
      activeGoal={activeGoal}
      invalidGoal={invalidGoal}
      totalCourseCount={allCourses.length}
      groupedCourses={groupedCourses}
    />
  );
}
