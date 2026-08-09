import { FooterSection } from "@/components/layout/sections/footer";
import { ogImagePath } from "@/lib/og";
import { SITE_URL, createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description:
    "How Pakish.ORG handles admission, contact, and Fi Sabilillah subsidy-review information sent through WhatsApp or email.",
  path: "/privacy",
  image: ogImagePath("privacy"),
});

export default function PrivacyPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Notice",
        item: `${SITE_URL}/privacy`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <article className="container py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 text-lg tracking-wider text-primary">Trust &amp; Privacy</p>
          <h1 className="text-3xl font-bold md:text-5xl">Pakish.ORG Privacy Notice</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            This notice explains what happens when you use the contact or
            admission forms on Pakish.ORG. Last updated: 8 August 2026.
          </p>

          <div className="mt-10 space-y-9 text-base leading-7 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground">What the website does</h2>
              <p className="mt-3">
                Pakish.ORG does not silently submit these forms to a database.
                After validation, the website opens WhatsApp or your email app
                with the information you entered. You review and send that
                message using the selected service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Information you choose to provide</h2>
              <p className="mt-3">
                Admission information can include contact details, city or
                address, education, skills, interests, social-profile link,
                chosen program, and learning mode. A subsidy request also asks
                about financial need, family support, possible contribution,
                and donor-review consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">How information is used</h2>
              <p className="mt-3">
                Pakish.ORG uses the information to respond to questions, guide
                program selection, process admission, and review eligibility for
                limited Fi Sabilillah support. Do not include passwords,
                financial-account details, identity-document images, or other
                sensitive records unless an authorized team member later
                explains why they are needed and how they will be handled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Subsidy and donor review</h2>
              <p className="mt-3">
                Subsidy application details may be shared with a trusted
                donor or sponsor only when the applicant selects the subsidy
                route and gives the stated consent. A donor may contact the
                applicant directly only when the separate contact consent is
                given. Consent does not guarantee funding or admission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Third-party communication services</h2>
              <p className="mt-3">
                WhatsApp and your email provider process messages under their
                own privacy terms. Pakish.ORG does not control those services.
                You can choose email instead of WhatsApp, or contact the team
                before sharing application details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Questions or correction requests</h2>
              <p className="mt-3">
                To ask how your application information is being used or to
                request a correction, email{" "}
                <a href="mailto:admin@pakish.org" className="text-primary hover:underline">
                  admin@pakish.org
                </a>{" "}
                or use the verified phone number listed on this website.
              </p>
            </section>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-xl font-bold">Ready to apply?</h2>
            <p className="mt-2 text-muted-foreground">
              Return to the admission form when you are comfortable with how
              the information will be sent and reviewed.
            </p>
            <Link href="/admission" className="mt-4 inline-flex font-semibold text-primary hover:underline">
              Go to admission →
            </Link>
          </div>
        </div>
      </article>
      <FooterSection />
    </>
  );
}
