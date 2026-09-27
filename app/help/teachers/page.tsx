import { TeacherGuideContent } from "@/components/help/teacher-guide-content";
import { FooterSection } from "@/components/layout/sections/footer";
import { TEACHER_GUIDE_META } from "@/lib/help/guides";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Teacher Guide | Pakish Institute",
  description: TEACHER_GUIDE_META.description,
  path: "/help/teachers",
  image: ogImagePath("home"),
  absoluteTitle: true,
});

export default function TeacherGuidePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Help",
        item: `${SITE_URL}/help`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Teacher Guide",
        item: `${SITE_URL}/help/teachers`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <TeacherGuideContent />
      <FooterSection />
    </>
  );
}
