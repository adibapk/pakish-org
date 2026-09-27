import { HelpHubContent } from "@/components/help/help-hub-content";
import { FooterSection } from "@/components/layout/sections/footer";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Help & Guides | Pakish Institute",
  description:
    "Student and teacher guides for Pakish Institute: apply without an invitation, understand admission review, pay after fee confirmation, and receive Academy access.",
  path: "/help",
  image: ogImagePath("home"),
  absoluteTitle: true,
  keywords: [
    "Pakish Institute help",
    "how to apply Pakish Institute",
    "Academy invite only",
    "course fee confirmation",
  ],
});

export default function HelpPage() {
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <HelpHubContent />
      <FooterSection />
    </>
  );
}
