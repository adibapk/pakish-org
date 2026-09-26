import { CourseCard } from "@/components/courses/course-card";
import { FooterSection } from "@/components/layout/sections/footer";
import { Button } from "@/components/ui/button";
import { getAdmissionPath } from "@/lib/admission";
import type { CourseGoal } from "@/lib/course-goals";
import { COURSE_CATALOG_META } from "@/lib/courses/data";
import type { Course } from "@/lib/courses/types";
import Link from "next/link";

interface CoursesIndexContentProps {
  courses: Course[];
  activeGoal?: CourseGoal;
  invalidGoal?: boolean;
  totalCourseCount: number;
}

export function CoursesIndexContent({
  courses,
  activeGoal,
  invalidGoal,
  totalCourseCount,
}: CoursesIndexContentProps) {
  const { heroHeading, heroDescription } = COURSE_CATALOG_META;

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <section className="py-12 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
            <p className="text-lg tracking-wider text-primary">
              Pakish Institute Courses
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {heroHeading}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {heroDescription}
            </p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
              <Button asChild>
                <Link href={getAdmissionPath()}>Enroll Now</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#contact">Ask About Custom Training</Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          className="border-t border-border py-12 md:py-20"
          aria-labelledby="course-listing-heading"
        >
          {activeGoal ? (
            <div
              className="mx-auto mb-8 max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center"
              role="status"
            >
              <p className="text-sm font-medium text-primary">Filtered by goal</p>
              <h2 className="mt-1 text-2xl font-bold">{activeGoal.title}</h2>
              <p className="mt-2 text-muted-foreground">{activeGoal.description}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Showing {courses.length} of {totalCourseCount} courses
              </p>
              <Button asChild variant="secondary" size="sm" className="mt-4">
                <Link href="/courses">Show all courses</Link>
              </Button>
            </div>
          ) : null}

          {invalidGoal ? (
            <div
              className="mx-auto mb-8 max-w-3xl rounded-xl border border-border bg-muted/40 px-5 py-4 text-center text-sm text-muted-foreground"
              role="status"
            >
              That course goal was not recognized. Showing all available courses.
            </div>
          ) : null}

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="course-listing-heading"
              className="text-3xl font-bold md:text-4xl"
            >
              {activeGoal ? `${activeGoal.title} Courses` : "Our Courses"}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {activeGoal
                ? "Programs mapped to this learning goal from our commercial catalogue."
                : "Choose a focused program in AI, web development, cloud or digital careers."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
