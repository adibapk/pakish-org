import Link from "next/link";
import { LogoGraphic } from "@/components/brand/logo-graphic";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
}

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center", className)}
      onClick={onClick}
      aria-label="Pakish.ORG home"
    >
      <LogoGraphic className={cn("h-9", imageClassName)} />
    </Link>
  );
}
