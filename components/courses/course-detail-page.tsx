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
import { getAdmissionPath, buildCourseInfoWhatsAppUrl } from "@/lib/admission";
import { TRAINING_FORMAT, TRAINING_OPTIONS } from "@/lib/courses/data";
import type { Course } from "@/lib/courses/types";
import {
  Building2,
  Check,
  Clock,
  GraduationCap,
  Laptop,
  MessageCircle,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseDetailPageProps {
  course: Course;
}

const optionIcons = [Laptop, Users, Building2, GraduationCap] as const;

function buildSecondaryAdmissionHref(course: Course): string {
  if (!course.cta?.secondaryPrefillMessage) {
    return getAdmissionPath(course.slug);
  }
  const params = new URLSearchParams({
    course: course.slug,
    interest: "ielts",
    prefill: course.cta.secondaryPrefillMessage,
  });
  return `/admission?${params.toString()}`;
}

export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const enrollHref = getAdmissionPath(course.slug);
  const secondaryHref = buildSecondaryAdmissionHref(course);
  const whatsappHref = buildCourseInfoWhatsAppUrl(course.title);
  const primaryCtaLabel = course.cta?.primaryLabel ?? "Apply for Admission";
  const secondaryCtaLabel = course.cta?.secondaryLabel;
  const toolsLabel = course.toolsSectionLabel ?? "Technologies & Tools";
  const heroImage = course.media?.hero;
  const spotlightImage = course.media?.spotlight;

  return (
    <>
      <CourseJsonLd course={course} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6 text-center">
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
            <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
              {course.summary}
            </p>

            {heroImage ? (
              <figure className="relative mt-2 w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="h-auto w-full object-cover"
                />
                {heroImage.caption ? (
                  <figcaption className="px-4 py-3 text-center text-sm text-muted-foreground">
                    {heroImage.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
              <Button asChild>
                <Link href={enrollHref}>{primaryCtaLabel}</Link>
              </Button>
              {secondaryCtaLabel ? (
                <Button asChild variant="secondary">
                  <Link href={secondaryHref}>{secondaryCtaLabel}</Link>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  Ask on WhatsApp
                </a>
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
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Instructor */}
        {course.instructor ? (
          <section className="border-t border-border py-12 md:py-16">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-muted/20 p-6 sm:p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-[minmax(200px,260px)_1fr] md:items-start">
                <div className="mx-auto w-full max-w-[260px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm">
                    <Image
                      src={course.instructor.image.src}
                      alt={course.instructor.image.alt}
                      fill
                      sizes="(max-width: 768px) 220px, 260px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-lg tracking-wider text-primary">Instructor</p>
                  <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                    {course.instructor.name}
                  </h2>
                  <p className="mt-2 text-base font-medium text-muted-foreground">
                    {course.instructor.role}
                  </p>
                  <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                    {course.instructor.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* In-page spotlight (classroom / environment imagery) */}
        {spotlightImage ? (
          <section className="border-t border-border py-12 md:py-16">
            <figure className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
              <Image
                src={spotlightImage.src}
                alt={spotlightImage.alt}
                width={spotlightImage.width}
                height={spotlightImage.height}
                sizes="(max-width: 768px) 100vw, 896px"
                className="h-auto w-full object-cover"
              />
              {spotlightImage.caption ? (
                <figcaption className="px-5 py-4 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {spotlightImage.caption}
                </figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

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
              Curriculum Framework
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              {course.durationMode === "consultation-led"
                ? "A modular framework adapted after needs assessment. Module depth depends on your selected format and goals."
                : "Module-based syllabus with lessons and assignments structured for future student portal and LMS progress tracking."}
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

        {/* Tools / skills */}
        <section className="border-t border-border py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 text-lg tracking-wider text-primary">
              Practice Areas
            </p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">{toolsLabel}</h2>
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
            <CoursePricingBlock
              pricing={course.pricing}
              showCta
              enrollHref={enrollHref}
              ctaLabel={primaryCtaLabel}
            />
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
