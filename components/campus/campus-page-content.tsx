import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FooterSection } from "@/components/layout/sections/footer";
import type { CampusData } from "@/lib/campus-data";
import { Check, Gift, MapPin } from "lucide-react";
import Link from "next/link";

interface CampusPageContentProps {
  campus: CampusData;
}

export function CampusPageContent({ campus }: CampusPageContentProps) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <section className="py-12 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Badge variant="outline" className="gap-2 py-2 text-sm">
            <MapPin className="size-4 text-primary" />
            {campus.location}
          </Badge>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {campus.heroTitle}
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl">
            {campus.heroSubtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Button asChild>
              <Link href="/#contact">Support This Campus</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/#courses">View Training Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-lg text-primary tracking-wider">About</p>
          <h2 className="text-3xl font-bold md:text-4xl">{campus.aboutTitle}</h2>
          {campus.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-center text-lg text-primary tracking-wider">
            Community Support
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Campus Equipment Needs
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
            Help us equip the {campus.shortName} campus so more women and youth
            can access quality IT and AI training in a safe, fully functional
            learning environment.
          </p>

          <div className="flex flex-col gap-6 md:flex-row">
            <Card className="flex-1 bg-muted/50 dark:bg-card">
              <CardHeader>
                <CardTitle>Equipment Needed</CardTitle>
                <CardDescription>
                  Items required to complete this campus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {campus.needs.map(({ item, quantity }) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>{quantity ? `${quantity} ${item}` : item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="flex-1 border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="size-5 text-primary" />
                  Already Donated
                </CardTitle>
                <CardDescription>
                  Generous contributions from our partners
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {campus.donated.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link href="/#contact">Donate or Sponsor Equipment</Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
