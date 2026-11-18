import type { Course } from "@/lib/courses/types";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

interface CourseJsonLdProps {
  course: Course;
}

export function CourseJsonLd({ course }: CourseJsonLdProps) {
  const url = `${SITE_URL}/courses/${course.slug}`;
  const imageUrl = absoluteUrl(course.seo.ogImage ?? "/og/home.png");

  const courseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seo.description,
    url,
    image: imageUrl,
    "@id": `${url}#course`,
    provider: { "@id": `${SITE_URL}/#organization` },
    educationalLevel: course.level,
    teaches: course.learningOutcomes,
    about: course.tools,
    offers: {
      "@type": "Offer",
      category: "Paid",
      url: `${SITE_URL}/admission?course=${course.slug}`,
      description: course.pricing.displayLabel,
      ...(course.pricing.startingAmount && {
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: course.pricing.startingAmount,
          priceCurrency: course.pricing.currency ?? "PKR",
        },
      }),
    },
    ...(course.isoDuration && { timeRequired: course.isoDuration }),
    ...(course.instructor && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        instructor: {
          "@type": "Person",
          name: course.instructor.name,
          jobTitle: course.instructor.role,
          image: absoluteUrl(course.instructor.image.src),
        },
      },
    }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: `${SITE_URL}/courses`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: course.title,
        item: url,
      },
    ],
  };

  const faqSchema =
    course.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: course.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const schemas = [courseSchema, breadcrumbSchema, faqSchema].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
