import { Badge } from "@/components/ui/badge";
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
import { curriculumTracks } from "@/lib/curriculum-data";
import { ArrowRight, Briefcase, Home } from "lucide-react";
import Link from "next/link";

export const CurriculumSection = () => {
  return (
    <section id="curriculum" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">
          AI &amp; IT Skills Curriculum
        </h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Three Pathways to Remote Tech Careers
        </h2>
        <p className="text-xl text-muted-foreground">
          Structured programs designed for Pakistani women entering IT, AI, and
          digital freelancing — from your first micro-income to global
          high-ticket contracts.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {curriculumTracks.map((track) => (
          <Card key={track.id} className="flex flex-col border-secondary">
            <CardHeader>
              <div className="mb-3 flex items-center justify-between gap-2">
                <Badge variant="outline">{track.duration}</Badge>
                <Badge variant="secondary" className="gap-1">
                  <Home className="size-3" />
                  WFH Ready
                </Badge>
              </div>
              <CardTitle className="text-2xl">{track.title}</CardTitle>
              <CardDescription className="text-base">
                {track.tagline}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              <p className="text-muted-foreground">{track.outcome}</p>

              {track.modules.map((module) => (
                <div key={module.title}>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-foreground">
                    <Icon
                      name="BookOpen"
                      size={18}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                    {module.title}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {module.skills.map((skill) => (
                      <li key={skill} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-primary">
                  <Briefcase className="size-4" />
                  Placement &amp; WFH Focus
                </p>
                <p className="text-sm text-muted-foreground">
                  {track.placementFocus}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`#contact`}>
                  Enroll in {track.title}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="#contact">Request Free Counseling</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
