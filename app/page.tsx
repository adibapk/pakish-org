import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { CurriculumSection } from "@/components/layout/sections/curriculum";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { GlimpsesSection } from "@/components/layout/sections/glimpses";
import { HeroSection } from "@/components/layout/sections/hero";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { TechTrustSection } from "@/components/layout/sections/tech-trust";
import { LearningOptionsSection } from "@/components/layout/sections/learning-options";
import { PathwaysSection } from "@/components/layout/sections/pathways";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "IT & AI Courses for Women in Pakistan | Pakish.ORG",
  description:
    "Join practical IT, AI and freelancing courses for women in Pakistan—at Gulshan-e-Iqbal Karachi, Lodhran or live online. Fee-based; need-based support.",
  path: "/",
  image: "/og/home.png",
  absoluteTitle: true,
  keywords: [
    "IT courses for women in Pakistan",
    "AI courses for women in Pakistan",
    "online IT courses for women",
    "freelancing courses for women",
    "women in tech training Pakistan",
  ],
});

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <TechTrustSection />
      <BenefitsSection />
      <FeaturesSection />
      <CurriculumSection />
      <LearningOptionsSection />
      <PathwaysSection />
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
