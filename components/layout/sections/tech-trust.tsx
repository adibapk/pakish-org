"use client";

import { Marquee } from "@devnomic/marquee";
import Image from "next/image";

interface TrustTool {
  name: string;
  logoSrc: string;
  width: number;
}

const trustTools: TrustTool[] = [
  { name: "GitHub", logoSrc: "/trust/github.svg", width: 100 },
  { name: "WordPress", logoSrc: "/trust/wordpress.svg", width: 120 },
  { name: "Next.js", logoSrc: "/trust/nextjs.svg", width: 100 },
  { name: "React", logoSrc: "/trust/react.svg", width: 90 },
  { name: "OpenAI", logoSrc: "/trust/openai.svg", width: 100 },
  { name: "Canva", logoSrc: "/trust/canva.svg", width: 85 },
  { name: "cPanel", logoSrc: "/trust/cpanel.svg", width: 95 },
  { name: "Git", logoSrc: "/trust/git.svg", width: 75 },
  { name: "Cursor", logoSrc: "/trust/cursor.svg", width: 95 },
  { name: "Figma", logoSrc: "/trust/figma.svg", width: 90 },
];

export const TechTrustSection = () => {
  return (
    <section
      id="tech-trust"
      className="w-full shrink-0 border-t border-border/60 pt-4 pb-2 md:pt-5 md:pb-3"
      aria-label="Skills and tools we teach"
    >
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground md:mb-4">
        Skills &amp; tools we teach
      </p>

      <div className="mx-auto max-w-[95%] overflow-hidden text-muted-foreground/70 md:max-w-[85%]">
        <Marquee
          className="gap-[2.5rem] md:gap-[3rem]"
          fade
          innerClassName="gap-[2.5rem] md:gap-[3rem]"
          pauseOnHover
        >
          {trustTools.map(({ name, logoSrc, width }) => (
            <div
              key={name}
              className="flex items-center shrink-0 opacity-60 transition-opacity hover:opacity-100"
              title={name}
            >
              <Image
                src={logoSrc}
                alt={name}
                width={width}
                height={32}
                className="h-7 w-auto object-contain md:h-8"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
