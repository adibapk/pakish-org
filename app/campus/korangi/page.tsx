import { CampusPageContent } from "@/components/campus/campus-page-content";
import { korangiCampus } from "@/lib/campus-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: korangiCampus.metaTitle,
  description: korangiCampus.metaDescription,
  path: "/campus/korangi",
  image: "/gallary/pakish-event-images-4-karachi-pakistan.png",
  absoluteTitle: true,
});

export default function KorangiCampusPage() {
  return <CampusPageContent campus={korangiCampus} />;
}
