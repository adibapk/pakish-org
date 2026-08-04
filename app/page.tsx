import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { CurriculumSection } from "@/components/layout/sections/curriculum";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { GlimpsesSection } from "@/components/layout/sections/glimpses";
import { HeroSection } from "@/components/layout/sections/hero";
import { TechTrustSection } from "@/components/layout/sections/tech-trust";
import { LearningOptionsSection } from "@/components/layout/sections/learning-options";
import { PathwaysSection } from "@/components/layout/sections/pathways";
import { PricingSection } from "@/components/layout/sections/pricing";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pakish.ORG | Professional IT & AI Training for Women in Pakistan",
  description:
    "Professional IT, AI, and freelancing training at Pakish.ORG. Standard fees apply for regular enrollment; limited free or subsidized seats are available for eligible learners under the Fi Sabilillah quota. Campuses in Gulshan-e-Iqbal, Karachi and Lodhran, plus online classes.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "IT training for women in Pakistan",
    "AI courses Pakistan",
    "subsidized IT training Pakistan",
    "women freelancing courses Karachi",
    "Gulshan-e-Iqbal IT campus",
    "Generative AI training",
  ],
});

export default function Home() {
  return (
    <>
      <section className="flex min-h-[100dvh] flex-col pt-20 pb-2 md:pt-24 md:pb-4">
        <div className="flex flex-1 flex-col justify-center min-h-0">
          <HeroSection />
        </div>
        <TechTrustSection />
      </section>
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
