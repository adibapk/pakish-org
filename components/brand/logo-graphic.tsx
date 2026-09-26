import { BRAND_LOGO_HEIGHT, BRAND_LOGO_WIDTH } from "@/lib/brand";
import { LOGO_SVG_MARKUP } from "@/lib/logo-svg";
import { cn } from "@/lib/utils";

interface LogoGraphicProps {
  className?: string;
}

export function LogoGraphic({ className }: LogoGraphicProps) {
  const svg = LOGO_SVG_MARKUP.replace(
    "<svg",
    `<svg aria-hidden="true" focusable="false" width="${BRAND_LOGO_WIDTH}" height="${BRAND_LOGO_HEIGHT}"`
  );

  return (
    <span
      className={cn(
        "inline-flex h-9 shrink-0 items-center [&_svg]:block [&_svg]:h-9 [&_svg]:w-auto",
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
