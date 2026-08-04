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
import { curriculumTracks } from "@/lib/curriculum-data";
import { Check } from "lucide-react";
import Link from "next/link";

export const PricingSection = () => {
  return (
    <section id="courses" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Courses
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Training Programs
      </h2>

      <h3 className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground pb-8">
        Structured professional training programs in IT, AI, and freelancing —
        from quick remote income skills to full development careers. Available
        in-house at our Gulshan-e-Iqbal, Karachi &amp; Lodhran campuses or live
        online via Zoom and Google Meet.
      </h3>

      <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-4 py-5 text-center text-sm leading-relaxed md:px-6 md:text-base">
        <p className="font-semibold text-foreground">Fee &amp; Subsidy Policy</p>
        <p className="mt-2 text-muted-foreground">
          Regular enrollments are paid. Limited free or subsidized seats are
          reserved for eligible learners who cannot afford full fees. Eligibility
          is reviewed during counseling and depends on available quota under the
          Fi Sabilillah initiative.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {curriculumTracks.map((track) => {
          const isPopular = track.id === "professional";
          const benefitList = track.modules.flatMap((module) => module.skills);

          return (
            <Card
              key={track.id}
              className={
                isPopular
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2 pb-2">
                  <CardTitle>{track.title}</CardTitle>
                  {isPopular ? (
                    <Badge className="shrink-0">Most Popular</Badge>
                  ) : null}
                </div>

                <CardDescription className="pb-4">
                  {track.outcome}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">{track.duration}</span>
                  <span className="text-muted-foreground"> program</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.slice(0, 5).map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2 shrink-0" />
                      <span>{benefit}</span>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button
                  asChild
                  variant={isPopular ? "default" : "secondary"}
                  className="w-full"
                >
                  <Link href="#contact">Request Fee Details</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#contact">Check Subsidy Eligibility</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
