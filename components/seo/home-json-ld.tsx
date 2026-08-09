import { curriculumTracks } from "@/lib/curriculum-data";
import { HOME_FAQS } from "@/lib/home-content";
import { SITE_URL } from "@/lib/seo";

export function HomeJsonLd() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "IT & AI Courses for Women in Pakistan | Pakish.ORG",
      description:
        "Practical IT, AI, web development, and freelancing courses for women in Pakistan, available in Karachi, Lodhran, and live online.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-PK",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Pakish.ORG IT, AI and freelancing programs",
      itemListElement: curriculumTracks.map((track, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: track.title,
          description: track.outcome,
          provider: { "@id": `${SITE_URL}/#organization` },
          timeRequired: track.isoDuration,
          educationalLevel: track.level,
          url: `${SITE_URL}/#courses`,
          inLanguage: "en-PK",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOME_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
