import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { learningModes } from "@/lib/curriculum-data";
import { icons } from "lucide-react";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export const LearningOptionsSection = () => {
  return (
    <section id="learning-options" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">
          Flexible Learning
        </h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Learn In-Person or Online — Your Choice
        </h2>
        <p className="text-xl text-muted-foreground">
          Every curriculum track is available at our Karachi and Lodhran campuses
          or through live online sessions on Zoom and Google Meet — designed for
          women building remote careers from anywhere in Pakistan.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-secondary bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
          <Users className="size-4 text-primary" />
          Female-friendly classrooms with mentor support at every campus
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {learningModes.map(({ icon, title, description, href, cta }) => (
          <Card key={title} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3 ring-8 ring-primary/5">
                <Icon
                  name={icon as keyof typeof icons}
                  size={24}
                  color="hsl(var(--primary))"
                  className="text-primary"
                />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              {href ? (
                <Button asChild variant="secondary" className="w-full">
                  <Link href={href}>
                    {cta}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="secondary" className="w-full">
                  <Link href="#contact">
                    {cta}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="#contact">
            Start Enrollment
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contact">Book a Counseling Session</Link>
        </Button>
      </div>
    </section>
  );
};
