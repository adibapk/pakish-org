import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COURSE_GOALS } from "@/lib/course-goals";
import { getCourseBySlug } from "@/lib/courses";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const CourseGoalsSection = () => {
  return (
    <section id="courses" className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-lg tracking-wider text-primary">Choose Your Goal</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Three Pathways Into Modern Tech Skills
        </h2>
        <p className="text-xl text-muted-foreground">
          Start with one clear goal, then explore the six professional courses
          that match your pace, format, and career direction.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {COURSE_GOALS.map((goal) => {
          const courses = goal.courseSlugs
            .map((slug) => getCourseBySlug(slug))
            .filter(Boolean);

          return (
            <Card
              key={goal.id}
              className="flex flex-col border-secondary transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-2xl">{goal.title}</CardTitle>
                <CardDescription className="text-base">
                  {goal.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                <p className="text-sm font-medium text-foreground">
                  Includes {courses.length} course
                  {courses.length === 1 ? "" : "s"}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {courses.map((course) => (
                    <Badge key={course!.slug} variant="secondary">
                      {course!.shortTitle}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={goal.href}>
                    View Courses
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
