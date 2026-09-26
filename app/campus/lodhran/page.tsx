import { FuturePlanCampusContent } from "@/components/campus/future-plan-campus-content";
import { lodhranCampus } from "@/lib/campus-data";
import { ogImagePath } from "@/lib/og";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const baseMetadata = createPageMetadata({
  title: lodhranCampus.metaTitle,
  description: lodhranCampus.metaDescription,
  path: "/campus/lodhran",
  image: ogImagePath(lodhranCampus.ogKey),
  absoluteTitle: true,
  keywords: [
    lodhranCampus.primaryKeyword,
    "future rural digital skills campus",
    "Pakish Institute South Punjab plan",
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: true,
  },
};

export default function LodhranFuturePlanPage() {
  return <FuturePlanCampusContent campus={lodhranCampus} />;
}
