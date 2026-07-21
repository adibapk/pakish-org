import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_MARK } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  href?: string;
  showWordmark?: boolean;
  wordmark?: string;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  onClick?: () => void;
}

export function BrandLogo({
  href = "/",
  showWordmark = true,
  wordmark = "Pakish.ORG",
  className,
  markClassName,
  wordmarkClassName,
  onClick,
}: BrandLogoProps) {
  const content = (
    <>
      <Image
        src={BRAND_LOGO_MARK}
        alt=""
        width={36}
        height={36}
        className={cn("h-9 w-9 shrink-0", markClassName)}
        aria-hidden={showWordmark}
        priority
      />
      {showWordmark ? (
        <span className={cn("font-bold", wordmarkClassName)}>{wordmark}</span>
      ) : (
        <span className="sr-only">{wordmark}</span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2", className)}
      onClick={onClick}
      aria-label={`${wordmark} home`}
    >
      {content}
    </Link>
  );
}
