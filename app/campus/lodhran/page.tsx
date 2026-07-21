import { CampusPageContent } from "@/components/campus/campus-page-content";
import { lodhranCampus } from "@/lib/campus-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: lodhranCampus.metaTitle,
  description: lodhranCampus.metaDescription,
  path: "/campus/lodhran",
  image: "/gallary/pakish-event-images-3.webp",
  absoluteTitle: true,
});

export default function LodhranCampusPage() {
  return <CampusPageContent campus={lodhranCampus} />;
}
