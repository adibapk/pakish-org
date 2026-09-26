import { AdmissionForm } from "@/components/admission/admission-form";
import { CourseAdmissionForm } from "@/components/admission/course-admission-form";
import { FooterSection } from "@/components/layout/sections/footer";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";

export const metadata = createPageMetadata({
  title: "Admissions | Pakish Institute",
  description:
    "Join Pakish Institute professional AI, Web Development, Cloud and Digital Skills courses.",
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
  }>;
}

export default async function AdmissionPage({ searchParams }: AdmissionPageProps) {
  const params = await searchParams;
  const courseSlug = params?.course;

  // Preserve legacy Fi Sabilillah / curriculum-track form when explicitly requested.
  const useLegacyForm =
    !courseSlug &&
    Boolean(params?.type || params?.program || params?.campus);

  return (
    <>
      {useLegacyForm ? (
        <AdmissionForm
          initialType={params?.type}
          initialProgram={params?.program}
          initialCampus={params?.campus}
        />
      ) : (
        <CourseAdmissionForm initialCourseSlug={courseSlug} />
      )}
      <FooterSection />
    </>
  );
}
