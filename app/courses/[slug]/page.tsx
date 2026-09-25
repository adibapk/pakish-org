import { CourseDetailPage } from "@/components/courses/course-detail-page";
import { getCourseBySlug, getCourseSlugs } from "@/lib/courses";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found | Pakish.ORG",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: `/courses/${course.slug}`,
    image: course.seo.ogImage ?? "/og/home.png",
    absoluteTitle: true,
    keywords: course.seo.keywords,
  });
}

export default async function CourseSlugPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
