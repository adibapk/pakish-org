"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-4 mx-auto py-6 md:py-8 lg:py-10">
        <div className="text-center space-y-4 md:space-y-5 lg:space-y-6">
          <Badge variant="outline" className="text-sm py-2 gap-2">
            <Badge className="text-xs">Est. 1999</Badge>
            Backed by Pakish Group
          </Badge>

          <div className="max-w-screen-lg mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <h1>
              Empowering Women in Tech –{" "}
              <span className="text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                Professional IT &amp; AI Training with Need-Based Support
              </span>
            </h1>
          </div>

          <p className="max-w-screen-md mx-auto text-base md:text-lg text-muted-foreground">
            Backed by Pakish Group (Est. 1999), Pakish.ORG offers professional
            training in Generative AI, Web Development, and Digital
            Freelancing. Our regular programs are fee-based. Eligible women and
            students who cannot afford full fees may apply for limited free or
            subsidized seats under the Fi Sabilillah quota. Build your
            Work-From-Home (WFH) career with expert mentors at our Gulshan-e-Iqbal,
            Karachi and Lodhran campuses, or online via Zoom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="w-full sm:w-auto font-bold group/arrow">
              <Link href="#courses">
                Explore Programs
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-full sm:w-auto font-bold"
            >
              <Link href="#contact">
                <Heart className="size-5 mr-2" />
                Apply / Ask About Eligibility
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
