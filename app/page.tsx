import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { GlimpsesSection } from "@/components/layout/sections/glimpses";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pakish.ORG | Free IT & AI Training for Women in Pakistan",
  description:
    "Join free and subsidized IT, AI, and freelancing programs at Pakish.ORG. On-site campuses in Karachi and Lodhran, plus online classes for women across Pakistan.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialSection />
      <GlimpsesSection />
      <TeamSection />
      <CommunitySection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
