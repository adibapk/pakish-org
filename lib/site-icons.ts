import type { Metadata } from "next";
import {
  BRAND_FAVICON_16,
  BRAND_FAVICON_32,
  BRAND_FAVICON_48,
  BRAND_LOGO_MARK,
} from "@/lib/brand";

export const SITE_LOGO = BRAND_LOGO_MARK;

export const SITE_ICONS: Metadata["icons"] = {
  icon: [
    { url: BRAND_FAVICON_48, sizes: "48x48", type: "image/svg+xml" },
    { url: BRAND_FAVICON_32, sizes: "32x32", type: "image/svg+xml" },
    { url: BRAND_FAVICON_16, sizes: "16x16", type: "image/svg+xml" },
  ],
  shortcut: BRAND_FAVICON_16,
  apple: BRAND_FAVICON_48,
};
