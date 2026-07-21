import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { CurriculumSection } from "@/components/layout/sections/curriculum";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { GlimpsesSection } from "@/components/layout/sections/glimpses";
import { HeroSection } from "@/components/layout/sections/hero";
import { LearningOptionsSection } from "@/components/layout/sections/learning-options";
import { PathwaysSection } from "@/components/layout/sections/pathways";
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
  keywords: [
    "free IT training for women",
    "AI courses Pakistan",
    "Pakish.ORG",
    "women freelancing Pakistan",
    "Generative AI training",
  ],
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <CurriculumSection />
      <LearningOptionsSection />
      <PathwaysSection />
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
