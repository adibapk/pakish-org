import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/layout/sections/hero-visual";
import { ArrowRight, Heart, MapPin, Video } from "lucide-react";
import Link from "next/link";

const heroIndicators = [
  { icon: MapPin, label: "Karachi Campus" },
  { icon: MapPin, label: "Lodhran Campus" },
  { icon: Video, label: "Live Online" },
];

export const HeroSection = () => {
  return (
    <section className="container w-full pt-8 pb-8 sm:pt-10 md:pt-12 md:pb-10">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <Badge variant="outline" className="gap-2 py-2 text-sm">
            <Badge className="text-xs">Est. 1999</Badge>
            Backed by Pakish Group
          </Badge>

          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Empowering Women in Tech —{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Professional IT &amp; AI Training
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
            Hands-on training in Generative AI, Web Development, and Digital
            Freelancing — with expert mentors at our Karachi and Lodhran
            campuses, or live online.
          </p>

          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground/80 lg:mx-0">
            Regular programs are fee-based. A limited number of free or
            subsidized seats are reserved for eligible learners under the Fi
            Sabilillah quota.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Button
              asChild
              size="lg"
              className="w-full font-bold group/arrow sm:w-auto"
            >
              <Link href="#courses">
                Explore Programs
                <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="w-full font-bold sm:w-auto"
            >
              <Link href="#contact">
                <Heart className="mr-2 size-5" />
                Apply / Check Eligibility
              </Link>
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
