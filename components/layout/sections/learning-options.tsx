import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TRAINING_OPTIONS } from "@/lib/courses/data";
import { ArrowRight, Building2, MapPin, Video } from "lucide-react";
import Link from "next/link";

const deliveryModes = [
  {
    icon: MapPin,
    title: "Karachi Campus — Gulshan-e-Iqbal",
    description:
      "In-center training at our Gulshan-e-Iqbal campus on Main University Road when cohorts are scheduled.",
    href: "/campus/gulshan-e-iqbal",
    cta: "Visit Karachi Campus",
  },
  {
    icon: Video,
    title: "Live Online (Google Meet)",
    description:
      "Join live instructor-led sessions from anywhere in Pakistan — one-to-one, group, or team formats.",
    href: "/admission",
    cta: "Apply Online",
  },
  {
    icon: Building2,
    title: "Office / Team Training",
    description:
      "Customized workshops and team upskilling at your workplace or preferred location.",
    href: "/admission?training=office-team",
    cta: "Request Team Training",
  },
];

export const LearningOptionsSection = () => {
  return (
    <section
      id="learning-options"
      className="w-full py-16 sm:py-24"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-lg tracking-wider text-primary">
            Training Options
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Learn On Campus, Online, or At Your Workplace
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the delivery format that fits your schedule, team, and
            location — all programs use the same practical, project-based
            approach.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {deliveryModes.map(({ icon: Icon, title, description, href, cta }) => (
            <Card
              key={title}
              className="flex flex-col bg-background transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 ring-8 ring-primary/5">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-base">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={href}>
                    {cta}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINING_OPTIONS.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-muted/30 p-4 text-sm"
            >
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
