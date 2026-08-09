import { CampusPageContent } from "@/components/campus/campus-page-content";
import { karachiCampus } from "@/lib/campus-data";
import { ogImagePath } from "@/lib/og";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: karachiCampus.metaTitle,
  description: karachiCampus.metaDescription,
  path: "/campus/gulshan-e-iqbal",
  image: ogImagePath(karachiCampus.ogKey),
  absoluteTitle: true,
  keywords: [
    karachiCampus.primaryKeyword,
    "IT courses in Gulshan-e-Iqbal",
    "women computer courses Karachi",
    "AI training Main University Road",
  ],
});

export default function GulshanCampusPage() {
  return <CampusPageContent campus={karachiCampus} />;
}
