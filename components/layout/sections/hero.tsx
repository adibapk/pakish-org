import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/layout/sections/hero-visual";
import { ArrowRight, MapPin, Users, Video } from "lucide-react";
import Link from "next/link";

const heroIndicators = [
  { icon: MapPin, label: "Karachi Campus" },
  { icon: Video, label: "Live Online" },
  { icon: Users, label: "Team Training" },
];

export const HeroSection = () => {
  return (
    <section className="container w-full pt-8 pb-6 sm:pt-10 md:pt-12 md:pb-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <Badge variant="outline" className="gap-2 py-2 text-sm">
            Backed by Pakish Group · Est. 1999
          </Badge>

          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Professional IT &amp; AI Courses in{" "}
            <span className="text-primary">Pakistan</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
            Build practical skills in Generative AI, automation, full-stack
            development, WordPress, cloud and AI-powered freelancing through
            live, instructor-led training for students, professionals, teams and
            businesses.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full font-bold group/arrow sm:w-auto"
            >
              <Link href="/courses">
                Explore Courses
                <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full font-bold sm:w-auto"
            >
              <Link href="/admission">Apply for Admission</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {heroIndicators.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
};
