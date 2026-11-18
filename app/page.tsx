import { Suspense } from "react";
import { ContactSection } from "@/components/layout/sections/contact";
import { CourseGoalsSection } from "@/components/layout/sections/course-goals";
import { EnrollmentSection } from "@/components/layout/sections/enrollment";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturedCoursesSection } from "@/components/layout/sections/featured-courses";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { TechTrustSection } from "@/components/layout/sections/tech-trust";
import { LearningOptionsSection } from "@/components/layout/sections/learning-options";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { WomensEmpowermentPreviewSection } from "@/components/layout/sections/womens-empowerment-preview";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pakish Institute | IT & AI Courses in Karachi and Online",
  description:
    "Compare course fees, durations and projects at Pakish Institute. Study live online across Pakistan or ask about scheduled classes in Gulshan-e-Iqbal, Karachi.",
  path: "/",
  image: "/og/home.png",
  absoluteTitle: true,
  keywords: [
    "professional IT and AI courses in Pakistan",
    "practical AI courses in Pakistan",
    "online IT courses in Pakistan",
    "professional technology training Pakistan",
    "web development and freelancing courses Pakistan",
  ],
});

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <TechTrustSection />
      <FeaturesSection />
      <CourseGoalsSection />
      <FeaturedCoursesSection />
      <LearningOptionsSection />
      <EnrollmentSection />
      <TestimonialSection />
      <WomensEmpowermentPreviewSection />
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
      <FAQSection />
      <FooterSection />
    </>
  );
}
