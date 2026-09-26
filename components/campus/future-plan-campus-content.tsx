import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FooterSection } from "@/components/layout/sections/footer";
import type { CampusData } from "@/lib/campus-data";
import { AlertCircle, MapPin } from "lucide-react";
import Link from "next/link";

interface FuturePlanCampusContentProps {
  campus: CampusData;
}

export function FuturePlanCampusContent({ campus }: FuturePlanCampusContentProps) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <section className="py-12 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          <Badge variant="outline" className="gap-2 py-2 text-sm">
            <MapPin className="size-4 text-primary" />
            Future plan · Not yet operational
          </Badge>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {campus.heroTitle}
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl">
            {campus.heroSubtitle}
          </p>

          <div className="w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-left">
            <div className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <AlertCircle className="size-5 text-amber-600" aria-hidden="true" />
              Current operational status
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {campus.operationalStatus?.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            {campus.primaryCta ? (
              <Button asChild>
                <Link href={campus.primaryCta.href}>{campus.primaryCta.label}</Link>
              </Button>
            ) : null}
            {campus.secondaryCta ? (
              <Button asChild variant="secondary">
                <Link href={campus.secondaryCta.href}>
                  {campus.secondaryCta.label}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-lg tracking-wider text-primary">Planning context</p>
          <h2 className="text-3xl font-bold md:text-4xl">{campus.aboutTitle}</h2>
          {campus.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
