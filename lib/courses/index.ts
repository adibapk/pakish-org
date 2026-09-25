import { courses } from "./data";
import type { Course, CourseSlug } from "./types";

export function getAllCourses(): Course[] {
  return courses
    .filter((course) => course.published)
    .sort((a, b) => a.order - b.order);
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
