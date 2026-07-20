import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export const metadata = {
  title: "Pakish.ORG - Women's IT & AI Institute",
  description:
    "Pakish.ORG empowers women through IT and AI education, training, and community — building Pakistan's next generation of tech leaders.",
  openGraph: {
    type: "website",
    url: "https://pakish.org",
    title: "Pakish.ORG - Women's IT & AI Institute",
    description:
      "Pakish.ORG empowers women through IT and AI education, training, and community — building Pakistan's next generation of tech leaders.",
    siteName: "Pakish.ORG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakish.ORG - Women's IT & AI Institute",
    description:
      "Pakish.ORG empowers women through IT and AI education, training, and community — building Pakistan's next generation of tech leaders.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
