import type { Course } from "@/lib/courses/types";
import { SITE_LOGO, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

interface CourseJsonLdProps {
  course: Course;
}

export function CourseJsonLd({ course }: CourseJsonLdProps) {
  const url = `${SITE_URL}/courses/${course.slug}`;
  const imageUrl = absoluteUrl(course.seo.ogImage ?? "/og/home.png");
  const logoUrl = absoluteUrl(SITE_LOGO);

  const courseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.seo.description,
    url,
    image: imageUrl,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    educationalLevel: course.level,
    teaches: course.learningOutcomes,
    about: course.tools,
    offers: course.pricing.startingAmount
      ? {
          "@type": "Offer",
          category: "Paid",
          priceCurrency: course.pricing.currency ?? "PKR",
          price: course.pricing.startingAmount,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/admission?course=${course.slug}`,
          description: course.pricing.displayLabel,
        }
      : {
          "@type": "Offer",
          category: "Paid",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/admission?course=${course.slug}`,
          description:
            course.pricing.displayLabel ?? "Customized training quotation",
        },
  };

  if (course.isoDuration) {
    courseSchema.timeRequired = course.isoDuration;
    courseSchema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: ["online", "onsite"],
      courseWorkload: course.isoDuration,
    };
  } else {
    courseSchema.hasCourseInstance = {
      "@type": "CourseInstance",
      courseMode: ["online", "onsite"],
    };
  }

  if (course.instructor) {
    courseSchema.instructor = {
      "@type": "Person",
      name: course.instructor.name,
      jobTitle: course.instructor.role,
      image: absoluteUrl(course.instructor.image.src),
    };
  }

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
