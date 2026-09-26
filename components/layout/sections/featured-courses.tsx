import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { getAllCourses } from "@/lib/courses";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const FeaturedCoursesSection = () => {
  const courses = getAllCourses();

  return (
    <section className="w-full bg-muted/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-lg tracking-wider text-primary">
            Course Catalogue
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Six Professional Programs
          </h2>
          <p className="text-xl text-muted-foreground">
            Transparent starting prices or custom quotes. Live Google Meet
            classes, campus cohorts, and customized team training.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/courses">
              Browse Full Catalogue
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
