"use client";

import { AdmissionNextSteps } from "@/components/admission/admission-next-steps";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ADMISSION_PAGE_COPY,
  TRAINING_PREFERENCE_OPTIONS,
  buildAdmissionWhatsAppUrl,
  buildCourseInfoWhatsAppUrl,
  type AdmissionRequestPayload,
  type TrainingPreference,
} from "@/lib/admission";
import type { PublicAdmissionLeadResponse } from "@/lib/admission/lead";
import { trackEvent } from "@/lib/analytics";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";
import type { CourseSlug } from "@/lib/courses/types";
import { PAYMENT_CONFIRMATION } from "@/lib/payment-methods";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const courseSlugs = getAllCourses().map((course) => course.slug) as [
  CourseSlug,
  ...CourseSlug[],
];

const formSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  whatsapp: z.string().min(7, "Please enter a WhatsApp number."),
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().email("Please enter a valid email.").optional()
  ),
  courseSlug: z
    .string()
    .min(1, "Please select a course.")
    .refine(
      (value): value is CourseSlug =>
        courseSlugs.includes(value as CourseSlug),
      { message: "Please select a valid course." }
    ),
  trainingPreference: z.enum(
    ["live-online", "in-center", "office-team", "home-onsite"],
    { required_error: "Please select a training preference." }
  ),
  message: z.string().optional(),
  website: z.string().optional(),
});

type CourseAdmissionFormValues = z.infer<typeof formSchema>;

interface CourseAdmissionFormProps {
  initialCourseSlug?: string;
  initialMessage?: string;
}

export function CourseAdmissionForm({
  initialCourseSlug,
  initialMessage,
}: CourseAdmissionFormProps) {
  const courses = useMemo(() => getAllCourses(), []);
  const validInitial = getCourseBySlug(initialCourseSlug ?? "")?.slug;

  const [submitted, setSubmitted] = useState<AdmissionRequestPayload | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CourseAdmissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      email: "",
      courseSlug: validInitial,
      message: initialMessage ?? "",
      website: "",
    },
  });

  const watchedCourseSlug = useWatch({
    control: form.control,
    name: "courseSlug",
  });
  const selectedCourse = getCourseBySlug(watchedCourseSlug ?? "");

  useEffect(() => {
    if (watchedCourseSlug) {
      trackEvent("course_selected", { course_slug: watchedCourseSlug });
    }
  }, [watchedCourseSlug]);

  async function handleSubmit(values: CourseAdmissionFormValues) {
    const course = getCourseBySlug(values.courseSlug);
    if (!course) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          whatsapp: values.whatsapp.trim(),
          email: values.email?.trim() || undefined,
          courseSlug: values.courseSlug,
          trainingPreference: values.trainingPreference,
          message: values.message?.trim() || undefined,
          website: values.website || "",
        }),
      });

      const data = (await response.json()) as PublicAdmissionLeadResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit admission request.");
      }

      const payload: AdmissionRequestPayload = {
        clientRequestId: data.requestId,
        fullName: values.fullName.trim(),
        whatsapp: values.whatsapp.trim(),
        email: values.email?.trim() || undefined,
        courseSlug: values.courseSlug,
        courseTitle: data.courseTitle || course.title,
        trainingPreference: values.trainingPreference as TrainingPreference,
        message: values.message?.trim() || undefined,
        submittedAt: data.createdAt || new Date().toISOString(),
        source: "web-admission-form",
        leadStatus: data.leadStatus || "New",
        paymentStatus: data.paymentStatus || "Pending",
        integrations: {
          aiTutorId: course.integrations?.aiTutorId,
        },
      };

      trackEvent("admission_form_submitted", {
        request_id: payload.clientRequestId,
        course_slug: payload.courseSlug,
      });

      window.sessionStorage.setItem(
        "pakish.admission.lastRequest",
        JSON.stringify(payload)
      );

      const waUrl = buildAdmissionWhatsAppUrl(payload);
      trackEvent("whatsapp_clicked", {
        context: "admission_submit",
        course_slug: payload.courseSlug,
      });
      window.open(waUrl, "_blank", "noopener,noreferrer");

      setSubmitted(payload);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit admission request."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <AdmissionNextSteps request={submitted} />;
  }

  return (
    <section className="container pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-lg tracking-wider text-primary">
              Admission
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">
              {ADMISSION_PAGE_COPY.heroHeading}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {ADMISSION_PAGE_COPY.heroDescription}
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">
              {ADMISSION_PAGE_COPY.noInviteNote}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {ADMISSION_PAGE_COPY.academyAccessNote}{" "}
              <Link href="/help/students" className="text-primary underline-offset-4 hover:underline">
                Student Guide
              </Link>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Applying is free and is not a purchase. Before any payment, staff
              send a dated written fee offer with policy version{" "}
              <strong className="text-foreground">2026-09-27</strong>. Read the{" "}
              <Link
                href="/terms"
                className="text-primary underline-offset-4 hover:underline"
              >
                Terms of Training
              </Link>{" "}
              and{" "}
              <Link
                href="/refund-policy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Payment &amp; Cancellation Policy
              </Link>
              .
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-secondary bg-card p-5">
            <p className="font-medium text-foreground">Prefer WhatsApp?</p>
            <p className="text-sm text-muted-foreground">
              Message us on {PAYMENT_CONFIRMATION.whatsappDisplay} for quick
              course information.
            </p>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a
                href={buildCourseInfoWhatsAppUrl(
                  selectedCourse?.title ?? "Pakish Institute"
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_clicked", {
                    context: "admission_info",
                    course_slug: watchedCourseSlug,
                  })
                }
              >
                <MessageCircle className="mr-2 size-4" />
                Ask on WhatsApp
              </a>
            </Button>
            <p className="text-sm text-muted-foreground">
              Or browse{" "}
              <Link
                href="/courses"
                className="font-medium text-primary hover:underline"
              >
                all courses
              </Link>
              .
            </p>
          </div>
        </div>

        <Card className="border-secondary">
          <CardHeader>
            <CardTitle>Admission Request</CardTitle>
            <CardDescription>
              Your request is saved securely for staff review. You can continue
              on WhatsApp and payment steps after submitting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-10000px] h-0 w-0 opacity-0"
                  {...form.register("website")}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="03XX XXXXXXX"
                          inputMode="tel"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="courseSlug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Course</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.slug}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainingPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Training Preference</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose training format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TRAINING_PREFERENCE_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message / Requirements (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Schedule preferences, team size, customization needs..."
                          className="min-h-[110px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {submitError && (
                  <p className="text-sm text-destructive">{submitError}</p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <MessageCircle className="mr-2 size-4" />
                      Submit Admission Request
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
