import { AdmissionForm } from "@/components/admission/admission-form";
import { CourseAdmissionForm } from "@/components/admission/course-admission-form";
import { FooterSection } from "@/components/layout/sections/footer";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import { redirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "Admissions | Pakish Institute",
  description:
    "Apply for professional AI, web development, cloud and digital skills courses at Pakish Institute.",
  path: "/admission",
  image: ogImagePath("admission"),
  absoluteTitle: true,
  keywords: [
    "Pakish Institute admission",
    "AI course admission Pakistan",
    "web development course enrollment",
    "Pakish Institute apply",
  ],
});

interface AdmissionPageProps {
  searchParams?: Promise<{
    type?: string;
    program?: string;
    campus?: string;
    course?: string;
    source?: string;
    support?: string;
    interest?: string;
    prefill?: string;
  }>;
}

export default async function AdmissionPage({ searchParams }: AdmissionPageProps) {
  const params = await searchParams;
  const courseSlug = params?.course;

  // Legacy subsidy links must enter through Women's Empowerment.
  if (
    params?.type === "subsidy" &&
    params?.source !== "womens-empowerment"
  ) {
    redirect("/womens-empowerment#fee-support");
  }

  // Women's Empowerment fee-support pathway (internal enum: subsidy).
  if (
    params?.source === "womens-empowerment" &&
    params?.support === "fee-support"
  ) {
    return (
      <>
        <AdmissionForm
          context="womens-empowerment"
          initialCourseSlug={courseSlug}
        />
        <FooterSection />
      </>
    );
  }

  // Legacy curriculum-track form for old fee-based deep links only.
  const useLegacyForm =
    !courseSlug &&
    Boolean(params?.type || params?.program || params?.campus) &&
    params?.type !== "subsidy";

  return (
    <>
      {useLegacyForm ? (
        <AdmissionForm
          context="legacy"
          initialType={params?.type}
          initialProgram={params?.program}
          initialCampus={params?.campus}
        />
      ) : (
        <CourseAdmissionForm
          initialCourseSlug={courseSlug}
          initialMessage={params?.prefill}
        />
      )}
      <FooterSection />
    </>
  );
}
