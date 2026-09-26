import { CurriculumToolsTicker } from "@/components/layout/sections/curriculum-tools-ticker";
import { CURRICULUM_TICKER_HEADING } from "@/lib/curriculum-ticker";

export const TechTrustSection = () => {
  return (
    <section
      id="tech-trust"
      className="w-full border-y border-border/50 bg-muted/30 py-5 md:py-6"
      aria-label={CURRICULUM_TICKER_HEADING}
    >
      <div className="container">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {CURRICULUM_TICKER_HEADING}
        </p>

        <CurriculumToolsTicker />
      </div>
    </section>
  );
};
