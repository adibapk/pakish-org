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
import { getCoursePath } from "@/lib/courses";
import type { Course } from "@/lib/courses/types";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { CoursePricingBlock } from "./course-pricing";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex h-full flex-col border-secondary transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="capitalize">
            {course.category.replace("-", " ")}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="size-3" />
            {course.duration}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-snug md:text-2xl">
          {course.title}
        </CardTitle>
        <CardDescription className="text-base">{course.summary}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <CoursePricingBlock pricing={course.pricing} compact />
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={getCoursePath(course.slug)}>
            View Course
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
