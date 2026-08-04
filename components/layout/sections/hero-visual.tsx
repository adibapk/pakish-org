import { Bot, GraduationCap, Video } from "lucide-react";

const courseChips = ["Generative AI", "Web Development", "Freelancing"];

/**
 * Decorative "digital learning environment" illustration for the hero section.
 * Purely presentational (aria-hidden) — all meaningful content lives in the
 * surrounding copy, so this conveys no information that isn't already in text.
 */
export const HeroVisual = () => {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[280px] w-full max-w-md select-none sm:h-[320px] lg:h-[420px] lg:max-w-none"
    >
      <div className="absolute -right-4 -top-8 size-36 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -left-6 bottom-0 size-32 rounded-full bg-primary/10 blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full text-primary/25"
        viewBox="0 0 400 340"
        fill="none"
      >
        <path
          d="M78 246c58-8 84-46 122-78"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          strokeLinecap="round"
          className="animate-hero-dash"
        />
        <path
          d="M322 96c-24 30-52 46-92 58"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 7"
          strokeLinecap="round"
          className="animate-hero-dash"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/5 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-primary/70" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Live Class
          </span>
        </div>

        <div className="space-y-2 rounded-xl bg-muted/60 p-3 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
          <p>
            <span className="text-primary">const</span> learner ={" "}
            <span className="text-primary">&quot;ready&quot;</span>;
          </p>
          <p className="flex items-center gap-1">
            ai.<span className="text-foreground">assist</span>(learner)
            <span className="ml-0.5 inline-block h-3 w-[3px] animate-pulse bg-primary/70" />
          </p>
          <div className="h-1.5 w-[70%] animate-hero-codeline rounded-full bg-primary/25" />
          <div className="h-1.5 w-1/2 rounded-full bg-foreground/10" />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border/70 bg-background/60 p-2.5">
          <GraduationCap className="size-4 shrink-0 text-primary" />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
      </div>

      <div className="animate-hero-float absolute right-0 top-1 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-md sm:right-1 sm:top-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Bot className="size-4 text-primary" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold leading-none text-foreground">
            AI Study Assistant
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Guides practice
          </p>
        </div>
      </div>

      <div className="animate-hero-float-alt absolute bottom-6 left-0 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-md sm:bottom-9 sm:left-1">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Video className="size-4 text-primary" />
        </span>
        <div className="text-left">
          <p className="text-xs font-semibold leading-none text-foreground">
            Live Mentor Session
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Karachi &middot; Online
          </p>
        </div>
      </div>

      <div className="animate-hero-float absolute bottom-0 right-1 flex flex-col items-end gap-1.5 sm:right-3">
        {courseChips.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-background/95 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
