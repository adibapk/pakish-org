import { FooterSection } from "@/components/layout/sections/footer";
import { PaymentMethodsContent } from "@/components/payment/payment-methods-content";
import { ogImagePath } from "@/lib/og";
import { SITE_URL, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Course Fee Payment Methods",
  description:
    "Pay your Pakish.ORG course fees via Meezan Bank, JazzCash, PayPal, or Payoneer, then share payment proof on WhatsApp or email to confirm admission.",
  path: "/payment-methods",
  image: ogImagePath("payment-methods"),
  keywords: [
    "Pakish course fee payment",
    "IT course payment Pakistan",
    "JazzCash course fee",
    "Meezan Bank Pakish Institute",
    "women IT training fees Pakistan",
  ],
});

export default function PaymentMethodsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Payment Methods",
        item: `${SITE_URL}/payment-methods`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PaymentMethodsContent />
      <FooterSection />
    </>
  );
}
