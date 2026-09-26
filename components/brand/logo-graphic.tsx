import {
  BRAND_LOGO_HEIGHT,
  BRAND_LOGO_WIDTH,
} from "@/lib/brand";
import { LOGO_SVG_MARKUP } from "@/lib/logo-svg";
import { cn } from "@/lib/utils";

interface LogoGraphicProps {
  className?: string;
}

export function LogoGraphic({ className }: LogoGraphicProps) {
  const svg = LOGO_SVG_MARKUP.replace(
    "<svg",
    '<svg aria-hidden="true" focusable="false"'
  );

  return (
    <span
      className={cn(
        "inline-flex shrink-0 [&_svg]:h-full [&_svg]:w-auto",
        className
      )}
      style={{
        height: "100%",
        aspectRatio: `${BRAND_LOGO_WIDTH} / ${BRAND_LOGO_HEIGHT}`,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
