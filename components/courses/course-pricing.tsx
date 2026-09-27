import { Button } from "@/components/ui/button";
import { PRICING_DISCLAIMER } from "@/lib/courses/data";
import type { CoursePricing } from "@/lib/courses/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CoursePricingBlockProps {
  pricing: CoursePricing;
  /** Compact mode for listing cards */
  compact?: boolean;
  /** Show contact CTA (detail pages) */
  showCta?: boolean;
  /** Prefill admission with this course */
  enrollHref?: string;
  ctaLabel?: string;
  className?: string;
}

export function CoursePricingBlock({
  pricing,
  compact = false,
  showCta = false,
  enrollHref = "/admission",
  ctaLabel = "Apply for Admission",
  className,
}: CoursePricingBlockProps) {
  return (
    <div
      className={cn(
        compact
          ? "space-y-2"
          : "rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8",
        className
      )}
    >
      {pricing.displayLabel && (
        <p
          className={cn(
            "font-semibold text-foreground",
            compact ? "text-base" : "text-2xl md:text-3xl"
          )}
        >
          {pricing.displayLabel}
        </p>
      )}

      {pricing.note && (
        <p
          className={cn(
            "text-muted-foreground",
            compact ? "text-sm" : "mt-2 text-base"
          )}
        >
          {pricing.note}
        </p>
      )}

      {!compact && (
        <>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {PRICING_DISCLAIMER}
          </p>

          {showCta && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href={enrollHref}>{ctaLabel}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/payment-methods">View Payment Methods</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
