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
    <section id="courses" className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-lg tracking-wider text-primary">
          AI &amp; IT Skills Curriculum
        </p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Three Pathways to Remote Tech Careers
        </h2>
        <p className="text-xl text-muted-foreground">
          Choose one clear path based on your current level. Every program is
          project-based and available in Karachi, Lodhran, or live online.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
        <strong className="text-foreground">Clear fee policy:</strong> regular
        admission is paid. Limited free or subsidized seats are reviewed for
        eligible learners under the Fi Sabilillah quota and depend on available
        support.
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {curriculumTracks.map((track) => (
          <Card
            key={track.id}
            className="flex flex-col border-secondary transition-shadow hover:shadow-md"
          >
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
                  Portfolio &amp; WFH Focus
                </p>
                <p className="text-sm text-muted-foreground">
                  {track.placementFocus}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href={`/admission?type=fee&program=${track.id}`}>
                  Apply for {track.title}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/admission?type=subsidy&program=${track.id}`}>
                  Request Subsidy Review
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
