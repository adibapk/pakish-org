"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_SUBJECTS,
  resolveContactSubjectFromQuery,
} from "@/lib/contact-subjects";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

const subjectOptions = Object.values(CONTACT_SUBJECTS);

export const ContactSection = () => {
  const searchParams = useSearchParams();
  const presetSubject = useMemo(
    () => resolveContactSubjectFromQuery(searchParams.get("subject") ?? undefined),
    [searchParams]
  );
  const isGatheringIntent =
    presetSubject === CONTACT_SUBJECTS.womensEmpowermentGathering;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: presetSubject ?? CONTACT_SUBJECTS.enrollment,
      message: isGatheringIntent
        ? "I would like to register interest in an upcoming Women's Empowerment gathering."
        : "",
    },
  });

  useEffect(() => {
    if (presetSubject) {
      form.setValue("subject", presetSubject);
      if (presetSubject === CONTACT_SUBJECTS.womensEmpowermentGathering) {
        form.setValue(
          "message",
          "I would like to register interest in an upcoming Women's Empowerment gathering."
        );
      }
    }
  }, [form, presetSubject]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, subject, message } = values;

    const body = `Hello, I am ${firstName} ${lastName}.\n\nEmail: ${email}\n\n${message}`;
    const mailToLink = `mailto:admin@pakish.org?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.assign(mailToLink);
  }

  return (
    <section id="contact" className="container py-16 sm:py-24">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <p className="text-lg text-primary mb-2 tracking-wider">
              Contact
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">Connect With Us</h2>
          </div>
          <p className="mb-4 text-muted-foreground lg:w-5/6">
            Contact us for course enrollment, fee quotes, campus visits, or team
            training inquiries. We will guide you through program options at
            Gulshan-e-Iqbal, Karachi, live online, or your workplace.
          </p>
          <p className="mb-8 text-sm text-muted-foreground lg:w-5/6">
            For Women&apos;s Empowerment gatherings or need-based fee support,
            visit the{" "}
            <a href="/womens-empowerment" className="text-primary hover:underline">
              initiative page
            </a>
            .
          </p>

          {isGatheringIntent ? (
            <p
              className="mb-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground lg:w-5/6"
              role="status"
            >
              You are registering interest in a Women&apos;s Empowerment
              gathering. This is separate from course admission or fee-support
              review.
            </p>
          ) : null}

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Find us</div>
              </div>

              <div>
                Gulshan-e-Iqbal, Main University Road, Karachi, Pakistan
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Call / WhatsApp</div>
              </div>

              <a
                href="https://wa.me/923008222456"
                className="hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                +92 300 8222456
              </a>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Mail US</div>
              </div>

              <div>admin@pakish.org</div>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Visit us</div>
              </div>

              <div>
                <div>Monday - Saturday</div>
                <div>9AM - 5PM</div>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"> </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjectOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          Choose enrollment, fee details, campus visit, team
                          training, or Women&apos;s Empowerment inquiries.
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={
                              isGatheringIntent
                                ? "Share your city, preferred timing, and what you hope to learn at the gathering."
                                : "Tell us which course you are interested in, your preferred campus or online option, and any questions about fees or schedule."
                            }
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="mt-4">Send message</Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};
