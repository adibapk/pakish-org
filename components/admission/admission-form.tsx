"use client";

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
  curriculumTracks,
  getTrackById,
  learningModes,
  type CurriculumTrackId,
} from "@/lib/curriculum-data";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const enrollmentTypes = {
  fee: "Regular fee-based admission",
  subsidy: "Fi Sabilillah subsidy review",
} as const;

type EnrollmentType = keyof typeof enrollmentTypes;

const formSchema = z
  .object({
    fullName: z.string().min(2, "Please enter the learner's name."),
    phone: z.string().min(7, "Please enter a WhatsApp or phone number."),
    email: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().email("Please enter a valid email.").optional()
    ),
    city: z.string().min(2, "Please enter city or area."),
    address: z.string().min(8, "Please enter home area or address."),
    education: z.string().min(2, "Please enter current education."),
    currentSkills: z.string().min(10, "Please tell us what the learner already knows."),
    interests: z.string().min(10, "Please describe current interests or goals."),
    socialProfile: z.string().min(3, "Please add a Facebook or public social profile link."),
    computerType: z.string().min(2, "Please enter the computer or laptop type."),
    processor: z.string().min(2, "Please enter the processor details."),
    ram: z.string().min(1, "Please enter the RAM size."),
    generation: z.string().min(1, "Please enter the computer generation."),
    internetSpeed: z.string().min(2, "Please enter home internet speed or connection quality."),
    program: z.string().min(1, "Please choose a program."),
    learningMode: z.string().min(1, "Please choose a learning mode."),
    enrollmentType: z.enum(["fee", "subsidy"]),
    needSummary: z.string().optional(),
    familySupport: z.string().optional(),
    monthlyContribution: z.string().optional(),
    donorConsent: z.boolean().optional(),
    donorContactConsent: z.boolean().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.enrollmentType !== "subsidy") return;

    if (!values.needSummary?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["needSummary"],
        message: "Please briefly explain why subsidy support is needed.",
      });
    }

    if (!values.familySupport?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["familySupport"],
        message: "Please briefly explain family/guardian support situation.",
      });
    }

    if (!values.monthlyContribution?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["monthlyContribution"],
        message: "Please choose what the learner can contribute.",
      });
    }

    if (!values.donorConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["donorConsent"],
        message: "Consent is required for donor-supported review.",
      });
    }

    if (!values.donorContactConsent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["donorContactConsent"],
        message: "Phone contact consent is required for donor-supported review.",
      });
    }
  });

type AdmissionFormValues = z.infer<typeof formSchema>;

interface AdmissionFormProps {
  initialType?: string;
  initialProgram?: string;
  initialCampus?: string;
}

export function AdmissionForm({
  initialType,
  initialProgram,
  initialCampus,
}: AdmissionFormProps) {
  const defaultType: EnrollmentType =
    initialType === "subsidy" ? "subsidy" : "fee";
  const defaultProgram = getTrackById(initialProgram as CurriculumTrackId)?.enrollmentValue ?? "";
  const defaultLearningMode =
    initialCampus === "gulshan-e-iqbal"
      ? learningModes[0].title
      : initialCampus === "lodhran"
        ? learningModes[1].title
        : "";

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      city: "",
      address: "",
      education: "",
      currentSkills: "",
      interests: "",
      socialProfile: "",
      computerType: "",
      processor: "",
      ram: "",
      generation: "",
      internetSpeed: "",
      program: defaultProgram,
      learningMode: defaultLearningMode,
      enrollmentType: defaultType,
      needSummary: "",
      familySupport: "",
      monthlyContribution: "",
      donorConsent: false,
      donorContactConsent: false,
    },
  });

  const selectedType = useWatch({
    control: form.control,
    name: "enrollmentType",
  });
  const isSubsidy = selectedType === "subsidy";

  function buildMessage(values: AdmissionFormValues) {
    const lines = [
      "Pakish.ORG admission request",
      "",
      `Name: ${values.fullName}`,
      `WhatsApp/Phone: ${values.phone}`,
      values.email ? `Email: ${values.email}` : undefined,
      `City/Area: ${values.city}`,
      `Home area/address: ${values.address}`,
      `Current education: ${values.education}`,
      `Current interests/goals: ${values.interests}`,
      `Current skills/experience: ${values.currentSkills}`,
      `Facebook/social profile: ${values.socialProfile}`,
      `Home computer/laptop: ${values.computerType}`,
      `Processor: ${values.processor}`,
      `RAM: ${values.ram}`,
      `Generation: ${values.generation}`,
      `Home internet speed/quality: ${values.internetSpeed}`,
      `Program: ${values.program}`,
      `Learning mode: ${values.learningMode}`,
      `Admission type: ${enrollmentTypes[values.enrollmentType]}`,
    ];

    if (values.enrollmentType === "subsidy") {
      lines.push(
        "",
        "Subsidy review details:",
        `Need summary: ${values.needSummary}`,
        `Family/guardian support: ${values.familySupport}`,
        `Possible monthly contribution: ${values.monthlyContribution}`,
        "Profile sharing consent: I agree that Pakish.ORG may share my profile and application details with trusted donors/sponsors for fee-support review.",
        "Phone contact consent: I agree that trusted donors/sponsors may contact me directly by phone/WhatsApp for review."
      );
    }

    return lines.filter(Boolean).join("\n");
  }

  function sendWhatsApp(values: AdmissionFormValues) {
    const text = encodeURIComponent(buildMessage(values));
    window.location.assign(`https://wa.me/923008222456?text=${text}`);
  }

  function sendEmail(values: AdmissionFormValues) {
    const subject = encodeURIComponent(
      `Admission Request - ${enrollmentTypes[values.enrollmentType]}`
    );
    const body = encodeURIComponent(buildMessage(values));
    window.location.assign(
      `mailto:admin@pakish.org?subject=${subject}&body=${body}`,
    );
  }

  return (
    <section className="container pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-lg tracking-wider text-primary">
              Admission
            </p>
            <h1 className="text-3xl font-bold md:text-5xl">
              Apply for IT, AI, and Freelancing Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose regular paid admission or request a Fi Sabilillah subsidy
              review. Tell us your goals and current skill level so the team can
              recommend the right program and learning mode.
            </p>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 size-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-semibold">How support requests work</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Regular admission is fee-based. Limited subsidy seats are
                  reviewed case by case. For subsidy requests, Pakish.ORG may
                  share the learner profile and application details with trusted
                  donors only after consent, so they can decide whether to
                  sponsor course fees and required premium learning tools.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground">
            {[
              "One form link for all learners",
              "Interest, education, address, and social profile collected for every applicant",
              "Extra donor-facing details only for subsidy review",
              "No subsidy approval guarantee before review",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-muted/50 dark:bg-card">
          <CardHeader>
            <CardTitle>Apply for admission</CardTitle>
            <CardDescription>
              Paid applications are focused; subsidy applications include enough
              detail to share with trusted donors after consent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(sendWhatsApp)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="enrollmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admission type</FormLabel>
                      <FormControl>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {Object.entries(enrollmentTypes).map(
                            ([value, label]) => (
                              <label
                                key={value}
                                className="flex cursor-pointer items-start gap-3 rounded-lg border border-input bg-background p-3 text-sm transition-colors hover:bg-accent"
                              >
                                <input
                                  type="radio"
                                  value={value}
                                  checked={field.value === value}
                                  onChange={() => field.onChange(value)}
                                  className="mt-1"
                                />
                                <span>{label}</span>
                              </label>
                            )
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp / phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+92..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / area</FormLabel>
                        <FormControl>
                          <Input placeholder="Karachi, Lodhran, online..." {...field} />
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
                        <FormLabel>Email (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home address / area</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="House/street, area, city"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {curriculumTracks.map((track) => (
                              <SelectItem
                                key={track.id}
                                value={track.enrollmentValue}
                              >
                                {track.title}
                              </SelectItem>
                            ))}
                            <SelectItem value="Not sure yet">
                              Not sure yet
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="learningMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Learning mode</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {learningModes.map((mode) => (
                              <SelectItem key={mode.title} value={mode.title}>
                                {mode.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current education</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Matric, Inter, BS, working professional..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook / social profile link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Facebook, LinkedIn, Instagram, portfolio..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current interest and learning goal</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="What does the learner want to learn, and why? Example: freelancing, Canva, AI tools, WordPress, coding, online earning..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What does the learner already know?</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Computer basics, mobile apps, typing, Canva, MS Office, social media, WordPress, coding, English level, previous courses..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-xl border border-secondary bg-background/70 p-4">
                  <h3 className="font-semibold">Home computer and internet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This helps us understand whether the learner can practice at
                    home and use tools like ChatGPT, Cursor, Zoom, and browser
                    based course platforms.
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="computerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Computer / laptop at home</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Desktop, laptop, shared family computer..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="processor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Processor</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Core i3, i5, i7, Ryzen, Apple M1..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="ram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RAM</FormLabel>
                          <FormControl>
                            <Input placeholder="4GB, 8GB, 16GB..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="generation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Generation</FormLabel>
                          <FormControl>
                            <Input placeholder="4th gen, 8th gen, M1..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="internetSpeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home internet speed</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10 Mbps, 20 Mbps, mobile data..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {isSubsidy ? (
                  <div className="grid gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div>
                      <h3 className="font-semibold">Subsidy review details</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        These details help trusted donors understand the
                        learner&apos;s situation and decide whether they can
                        sponsor fees and required premium learning tools.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="needSummary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why is subsidy support needed?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Briefly explain current study/work situation and why fee support is needed."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="familySupport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Family / guardian support situation</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Who supports the learner financially? Any current income, family responsibilities, or constraints donors should know?"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthlyContribution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What can the learner contribute?</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose contribution level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Cannot pay anything right now">
                                Cannot pay anything right now
                              </SelectItem>
                              <SelectItem value="Can pay a small partial amount">
                                Can pay a small partial amount
                              </SelectItem>
                              <SelectItem value="Can pay tools/internet but not course fee">
                                Can pay tools/internet but not course fee
                              </SelectItem>
                              <SelectItem value="Needs counselor guidance">
                                Needs counselor guidance
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="donorConsent"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(field.value)}
                                onChange={(event) =>
                                  field.onChange(event.target.checked)
                                }
                                className="mt-1"
                              />
                              <span>
                                I agree that Pakish.ORG may share my profile and
                                application details with trusted donors/sponsors
                                for fee-support review.
                              </span>
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="donorContactConsent"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <label className="flex cursor-pointer items-start gap-3 text-sm">
                              <input
                                type="checkbox"
                                checked={Boolean(field.value)}
                                onChange={(event) =>
                                  field.onChange(event.target.checked)
                                }
                                className="mt-1"
                              />
                              <span>
                                I agree that trusted donors/sponsors may contact
                                me directly by phone or WhatsApp for review.
                              </span>
                            </label>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <Button type="submit" className="w-full">
                    <MessageCircle className="mr-2 size-4" />
                    Send on WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={form.handleSubmit(sendEmail)}
                  >
                    <Mail className="mr-2 size-4" />
                    Send by Email
                  </Button>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  When you continue, the details you entered are opened in
                  WhatsApp or your email app for you to send. Subsidy details are
                  shared with a trusted donor only when you select the subsidy
                  option and give the required consent. Read our{" "}
                  <Link href="/privacy" className="font-medium text-primary hover:underline">
                    privacy notice
                  </Link>
                  .
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
