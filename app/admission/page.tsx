import { AdmissionForm } from "@/components/admission/admission-form";
import { FooterSection } from "@/components/layout/sections/footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Admission Form",
  description:
    "Apply for Pakish.ORG IT, AI, and freelancing training. Use one short admission form for regular fee-based enrollment or Fi Sabilillah subsidy review.",
  path: "/admission",
  keywords: [
    "Pakish admission form",
    "IT course admission Pakistan",
    "AI training admission Pakistan",
    "Fi Sabilillah subsidy review",
    "women IT training admission",
  ],
});

interface AdmissionPageProps {
  searchParams?: {
    type?: string;
  };
}

export default function AdmissionPage({ searchParams }: AdmissionPageProps) {
  return (
    <>
      <AdmissionForm initialType={searchParams?.type} />
      <FooterSection />
    </>
  );
}
