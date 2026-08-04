import { icons } from "lucide-react";
import { trustTools } from "@/lib/trust-tools";

export const TechTrustSection = () => {
  return (
    <section
      id="tech-trust"
      className="w-full border-y border-border/60 bg-muted/30 py-8 md:py-10"
      aria-label="Tools and platforms our students learn"
    >
      <div className="container">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Tools and platforms our students learn
        </p>

        <ul className="hidden grid-cols-3 gap-3 sm:grid md:grid-cols-5 md:gap-4 lg:grid-cols-10 lg:gap-3">
          {trustTools.map(({ name, icon }) => {
            const IconComponent = icons[icon];
            return (
              <li key={name}>
                <div className="group flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-transparent px-2 py-4 text-center transition-colors hover:border-border hover:bg-card">
                  <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border/60 transition-colors group-hover:text-primary group-hover:ring-primary/40">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                    {name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <ul
          className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 sm:hidden"
          aria-label="Scroll to see all tools taught"
        >
          {trustTools.map(({ name, icon }) => {
            const IconComponent = icons[icon];
            return (
              <li key={name} className="shrink-0 snap-start">
                <div className="flex w-[86px] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-2 py-4 text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border/60">
                    <IconComponent className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-muted-foreground">
                    {name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
