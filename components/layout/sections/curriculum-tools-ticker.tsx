"use client";

import { useState } from "react";
import { icons, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CURRICULUM_TICKER_DURATION_SEC,
  getCurriculumTickerPauseLabel,
} from "@/lib/curriculum-ticker";
import { trustTools, type TrustTool } from "@/lib/trust-tools";
import { cn } from "@/lib/utils";

function CurriculumToolItem({ name, icon }: TrustTool) {
  const IconComponent = icons[icon];

  return (
    <div
      className="flex shrink-0 items-center gap-2.5 text-muted-foreground opacity-70 transition-opacity duration-300 hover:opacity-100 sm:gap-3"
    >
      <span
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-background/80 text-muted-foreground ring-1 ring-border/50"
      >
        <IconComponent className="size-4" aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap text-sm font-medium">{name}</span>
    </div>
  );
}

export function CurriculumToolsTicker() {
  const [paused, setPaused] = useState(false);
  const pauseLabel = getCurriculumTickerPauseLabel(paused);

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end sm:absolute sm:right-0 sm:top-0 sm:mb-0 sm:-translate-y-full sm:pb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2 text-xs text-muted-foreground"
          aria-pressed={paused}
          aria-label={pauseLabel}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{pauseLabel}</span>
        </Button>
      </div>

      <div
        className="curriculum-ticker-scroll-parent group/ticker relative w-full overflow-hidden"
        data-paused={paused ? "true" : "false"}
      >
        <div
          className="curriculum-ticker-fade curriculum-ticker-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-muted/30 to-transparent sm:w-16"
          aria-hidden="true"
        />
        <div
          className="curriculum-ticker-fade curriculum-ticker-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-muted/30 to-transparent sm:w-16"
          aria-hidden="true"
        />

        <div
          className={cn(
            "curriculum-ticker-track flex w-max items-center gap-10 whitespace-nowrap sm:gap-14",
            paused && "curriculum-ticker-track--paused"
          )}
          style={{
            animation: `curriculum-ticker ${CURRICULUM_TICKER_DURATION_SEC}s linear infinite`,
          }}
        >
          <ul className="flex shrink-0 items-center gap-10 sm:gap-14">
            {trustTools.map(({ name, icon }) => (
              <li key={name} className="shrink-0">
                <CurriculumToolItem name={name} icon={icon} />
              </li>
            ))}
          </ul>

          <div
            className="flex shrink-0 items-center gap-10 sm:gap-14"
            aria-hidden="true"
          >
            {trustTools.map(({ name, icon }) => (
              <CurriculumToolItem
                key={`clone-${name}`}
                name={name}
                icon={icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
