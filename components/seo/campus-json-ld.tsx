import type { CampusData } from "@/lib/campus-data";
import { SITE_URL } from "@/lib/seo";

export function CampusJsonLd({ campus }: { campus: CampusData }) {
  const url = `${SITE_URL}/campus/${campus.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${url}/#campus`,
      name: `Pakish.ORG ${campus.shortName} Campus`,
      url,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      description: campus.metaDescription,
      address: {
        "@type": "PostalAddress",
        streetAddress: campus.streetAddress,
        addressLocality: campus.addressLocality,
        addressRegion: campus.addressRegion,
        addressCountry: "PK",
      },
      telephone: "+92-300-8222456",
      email: "admin@pakish.org",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: `${campus.shortName} Campus`,
          item: url,
        },
      ],
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
