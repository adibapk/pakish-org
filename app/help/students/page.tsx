import { StudentGuideContent } from "@/components/help/student-guide-content";
import { FooterSection } from "@/components/layout/sections/footer";
import { STUDENT_GUIDE_META, STUDENT_GUIDE_SECTIONS } from "@/lib/help/guides";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Student Guide | Pakish Institute",
  description: STUDENT_GUIDE_META.description,
  path: "/help/students",
  image: ogImagePath("help-students"),
  absoluteTitle: true,
  keywords: [
    "Pakish Institute student guide",
    "apply without invitation",
    "Academy access after enrollment",
  ],
});

export default function StudentGuidePage() {
  const faqEntities = STUDENT_GUIDE_SECTIONS.flatMap((section) =>
    (section.qa ?? []).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  );

  const jsonLd = [
    {
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
          name: "Student Guide",
          item: `${SITE_URL}/help/students`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntities,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudentGuideContent />
      <FooterSection />
    </>
  );
}
