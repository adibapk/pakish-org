import { CoursePricingBlock } from "@/components/courses/course-pricing";
import { CourseJsonLd } from "@/components/courses/course-json-ld";
import { FooterSection } from "@/components/layout/sections/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRAINING_FORMAT, TRAINING_OPTIONS } from "@/lib/courses/data";
import type { Course } from "@/lib/courses/types";
import {
  Building2,
  Check,
  Clock,
  GraduationCap,
  Laptop,
  Users,
} from "lucide-react";
import Link from "next/link";

interface CourseDetailPageProps {
  course: Course;
}

const optionIcons = [Laptop, Users, Building2, GraduationCap] as const;

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  return (
    <>
      <CourseJsonLd course={course} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="outline" className="capitalize">
                {course.category.replace("-", " ")} ·{" "}
                {course.level.replace("-", " ")}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Clock className="size-3.5" />
                {course.duration}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              {course.summary}
            </p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
              <Button asChild>
                <Link href="/admission">Apply for Admission</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/courses">All Courses</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-lg tracking-wider text-primary">Course Overview</p>
            <h2 className="text-3xl font-bold md:text-4xl">
              What this program covers
            </h2>
            {course.overview.map((paragraph) => (
              <p key={paragraph} className="text-lg text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* What You Will Learn */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">
              Learning Outcomes
            </p>
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              What You Will Learn
            </h2>
            <ul className="space-y-3">
              {course.learningOutcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Curriculum */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-center text-lg tracking-wider text-primary">
              Curriculum
            </p>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Complete Curriculum
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Module-based syllabus with lessons and assignments structured for
              future student portal and LMS progress tracking.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {course.curriculum.map((module) => (
                <Card key={module.id} className="bg-muted/30">
                  <CardHeader>
                    <CardDescription>
                      Module {module.order}
                      {module.estimatedHours
                        ? ` · ~${module.estimatedHours} hrs`
                        : ""}
                    </CardDescription>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    {module.description && (
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Lessons
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>
                              {lesson.title}
                              {lesson.summary ? ` — ${lesson.summary}` : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {module.assignments && module.assignments.length > 0 && (
                      <div>
                        <p className="mb-2 text-sm font-medium text-foreground">
                          Assignments
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {module.assignments.map((assignment) => (
                            <li key={assignment.id} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>{assignment.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">
              Tools Covered
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Technologies & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {course.tools.map((tool) => (
                <Badge key={tool} variant="secondary" className="px-3 py-1.5 text-sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Join */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">Audience</p>
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              Who Should Join
            </h2>
            <ul className="space-y-3">
              {course.whoShouldJoin.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Training Format */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-center text-lg tracking-wider text-primary">
              How You Learn
            </p>
            <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
              Training Format
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TRAINING_FORMAT.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-secondary bg-card p-5"
                >
                  <h3 className="mb-2 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Options */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="mb-2 text-center text-lg tracking-wider text-primary">
              Flexible Delivery
            </p>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Training Options
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Training available through online individual classes, group
              sessions, office/team training and customized workshops.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {TRAINING_OPTIONS.map((option, index) => {
                const Icon = optionIcons[index] ?? Laptop;
                return (
                  <div
                    key={option.title}
                    className="flex gap-4 rounded-xl border border-secondary bg-card p-5"
                  >
                    <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">Fees</p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Pricing</h2>
            <CoursePricingBlock pricing={course.pricing} showCta />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">FAQ</p>
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {course.faq.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
