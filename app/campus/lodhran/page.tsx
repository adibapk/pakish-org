import { CampusPageContent } from "@/components/campus/campus-page-content";
import { lodhranCampus } from "@/lib/campus-data";
import { ogImagePath } from "@/lib/og";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: lodhranCampus.metaTitle,
  description: lodhranCampus.metaDescription,
  path: "/campus/lodhran",
  image: ogImagePath(lodhranCampus.ogKey),
  absoluteTitle: true,
  keywords: [
    lodhranCampus.primaryKeyword,
    "AI training in Dunyapur",
    "digital skills for women South Punjab",
  ],
});

export default function LodhranCampusPage() {
  return <CampusPageContent campus={lodhranCampus} />;
}
