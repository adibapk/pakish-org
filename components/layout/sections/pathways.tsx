import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getTrackById,
  independenceStages,
} from "@/lib/curriculum-data";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export const PathwaysSection = () => {
  return (
    <section id="pathways" className="container py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-2 text-lg tracking-wider text-primary">
          Financial Independence
        </h2>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Your Path from Training to Remote Income
        </h2>
        <p className="text-xl text-muted-foreground">
          Pakish.ORG programs are built around real economic outcomes — helping
          women move from subsidized training to self-sustaining work-from-home
          careers and job placements in Pakistan&apos;s growing tech economy.
        </p>
      </div>

      <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
        {independenceStages.map((stage, index) => {
          const track = getTrackById(stage.trackId);

          return (
            <Card key={stage.step} className="relative overflow-hidden">
              <CardHeader>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline">{stage.timeline}</Badge>
                  <span className="text-4xl font-bold text-muted-foreground/20">
                    {stage.step}
                  </span>
                </div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <TrendingUp className="size-5 text-primary" />
                  {stage.title}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  Typical range: {stage.income}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{stage.description}</p>
                {track ? (
                  <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                    Recommended track:{" "}
                    <span className="font-medium text-foreground">
                      {track.title}
                    </span>
                  </p>
                ) : null}
                {index < independenceStages.length - 1 ? (
                  <div
                    className="absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-primary/30 lg:block"
                    aria-hidden="true"
                  />
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl border border-secondary bg-card p-8 text-center">
        <h3 className="text-2xl font-bold">
          Ready to start your financial independence journey?
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Whether you need subsidized enrollment, campus directions, or a
          one-on-one counseling call to choose the right track — our team is
          here to help Pakistani women enter remote IT and AI careers.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#contact">
              Enroll Now
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact">Get Free Career Counseling</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
