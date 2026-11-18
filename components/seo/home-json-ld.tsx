import { getAllCourses } from "@/lib/courses";
import { HOME_FAQS } from "@/lib/home-content";
import { SITE_URL } from "@/lib/seo";

export function HomeJsonLd() {
  const courses = getAllCourses();

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Pakish Institute | IT & AI Courses in Karachi and Online",
      description:
        "Compare course fees, durations and projects at Pakish Institute. Study live online across Pakistan or ask about scheduled classes in Gulshan-e-Iqbal, Karachi.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-PK",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Pakish Institute professional courses",
      itemListElement: courses.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: course.title,
          description: course.summary,
          provider: { "@id": `${SITE_URL}/#organization` },
          timeRequired: course.isoDuration,
          url: `${SITE_URL}/courses/${course.slug}`,
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
