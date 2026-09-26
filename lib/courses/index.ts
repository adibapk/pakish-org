import { DEFAULT_CATALOGUE_GROUP } from "./catalogue-groups";
import { courses } from "./data";
import type { Course, CourseCatalogueGroup, CourseSlug } from "./types";

function withCatalogueDefaults(course: Course): Course {
  return {
    ...course,
    catalogueGroup: course.catalogueGroup ?? DEFAULT_CATALOGUE_GROUP,
    showOnHomepageFeatured: course.showOnHomepageFeatured ?? true,
    durationMode: course.durationMode ?? "fixed",
  };
}

export function getAllCourses(): Course[] {
  return courses
    .filter((course) => course.published)
    .map(withCatalogueDefaults)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedCourses(): Course[] {
  return getAllCourses().filter((course) => course.showOnHomepageFeatured);
}

export function getCoursesByCatalogueGroup(
  group: CourseCatalogueGroup
): Course[] {
  return getAllCourses().filter((course) => course.catalogueGroup === group);
}

export function getTechnologyCourses(): Course[] {
  return getCoursesByCatalogueGroup("technology-digital");
}

export function getProfessionalSkillsCourses(): Course[] {
  return getCoursesByCatalogueGroup("professional-skills");
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getAllCourses().find((course) => course.slug === slug);
}

export function getCourseSlugs(): CourseSlug[] {
  return getAllCourses().map((course) => course.slug);
}

export function getCoursePath(slug: CourseSlug | string): string {
  return `/courses/${slug}`;
}
