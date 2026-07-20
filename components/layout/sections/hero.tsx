"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2 gap-2">
            <Badge className="text-xs">Est. 1999</Badge>
            Backed by Pakish Group
          </Badge>

          <div className="max-w-screen-lg mx-auto text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <h1>
              Empowering Women in Tech –{" "}
              <span className="text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                Free &amp; Subsidized IT/AI Training
              </span>
            </h1>
          </div>

          <p className="max-w-screen-md mx-auto text-lg md:text-xl text-muted-foreground">
            Backed by Pakish Group (Est. 1999), Pakish.ORG is a dedicated
            initiative to train women and youth in Generative AI, Web
            Development, and Digital Freelancing. Build your Work-From-Home
            (WFH) career with our expert family of mentors at our Karachi and
            Lodhran campuses, or online via Zoom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="w-full sm:w-auto font-bold group/arrow">
              <Link href="#courses">
                Explore Courses
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-full sm:w-auto font-bold"
            >
              <Link href="#community">
                <Heart className="size-5 mr-2" />
                Support Our Cause
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
