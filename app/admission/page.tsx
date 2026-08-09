import { AdmissionForm } from "@/components/admission/admission-form";
import { FooterSection } from "@/components/layout/sections/footer";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";

export const metadata = createPageMetadata({
  title: "IT & AI Course Admission for Women in Pakistan",
  description:
    "Apply for Pakish.ORG IT, AI and freelancing courses for women in Pakistan. Choose regular fee-based admission or request Fi Sabilillah support review.",
  path: "/admission",
  image: ogImagePath("admission"),
  keywords: [
    "Pakish admission form",
    "IT course admission Pakistan",
    "AI training admission Pakistan",
    "Fi Sabilillah subsidy review",
    "women IT training admission",
  ],
});

interface AdmissionPageProps {
  searchParams?: Promise<{
    type?: string;
    program?: string;
    campus?: string;
  }>;
}

export default async function AdmissionPage({ searchParams }: AdmissionPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <AdmissionForm
        initialType={resolvedSearchParams?.type}
        initialProgram={resolvedSearchParams?.program}
        initialCampus={resolvedSearchParams?.campus}
      />
      <FooterSection />
    </>
  );
}
