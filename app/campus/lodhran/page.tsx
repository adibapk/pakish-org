import { CampusPageContent } from "@/components/campus/campus-page-content";
import { lodhranCampus } from "@/lib/campus-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: lodhranCampus.metaTitle,
  description: lodhranCampus.metaDescription,
  openGraph: {
    title: lodhranCampus.metaTitle,
    description: lodhranCampus.metaDescription,
    type: "website",
    siteName: "Pakish.ORG",
  },
  twitter: {
    card: "summary_large_image",
    title: lodhranCampus.metaTitle,
    description: lodhranCampus.metaDescription,
  },
};

export default function LodhranCampusPage() {
  return <CampusPageContent campus={lodhranCampus} />;
}
