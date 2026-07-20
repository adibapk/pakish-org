import { CampusPageContent } from "@/components/campus/campus-page-content";
import { korangiCampus } from "@/lib/campus-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: korangiCampus.metaTitle,
  description: korangiCampus.metaDescription,
  openGraph: {
    title: korangiCampus.metaTitle,
    description: korangiCampus.metaDescription,
    type: "website",
    siteName: "Pakish.ORG",
  },
  twitter: {
    card: "summary_large_image",
    title: korangiCampus.metaTitle,
    description: korangiCampus.metaDescription,
  },
};

export default function KorangiCampusPage() {
  return <CampusPageContent campus={korangiCampus} />;
}
