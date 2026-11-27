import { FooterSection } from "@/components/layout/sections/footer";
import { ogImagePath } from "@/lib/og";
import { SITE_URL, createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Privacy Notice",
  description:
    "How Pakish Institute handles contact, admission, workshop registration, and Women's Empowerment fee-support information.",
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
          <h1 className="text-3xl font-bold md:text-5xl">Pakish Institute Privacy Notice</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            This notice explains how Pakish Institute handles information you
            share through its forms and how it counts visits to learning resources. Last updated 27 November 2026.
          </p>

          <div className="mt-10 space-y-9 text-base leading-7 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground">What the website does</h2>
              <p className="mt-3">
                Pakish Institute stores admission requests submitted through the
                online admission form. Contact messages may open WhatsApp or
                your email app for you to review and send. You choose what to
                share and when to send it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Information you choose to provide</h2>
              <p className="mt-3">
                Admission information can include contact details, city or
                address, education, skills, interests, social-profile link,
                chosen course, training preference, and an optional answer about
                how you first heard of Pakish Institute. A Women&apos;s Empowerment
                fee-support request also asks about financial need, family
                support, possible contribution, and review consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">How information is used</h2>
              <p className="mt-3">
                Pakish Institute uses the information to respond to questions,
                guide course selection, process paid admission, and review
                eligibility for limited need-based fee support through the
                Women&apos;s Empowerment initiative. The optional answer about
                how you found us helps the admissions team understand which
                channels reach prospective learners. Do not include passwords,
                financial-account details, identity-document images, or other
                sensitive records unless an authorized team member later
                explains why they are needed and how they will be handled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Workshop registration</h2>
              <p className="mt-3">
                The workshop form asks for your contact details, preferred
                date, session choices, experience and device. You can also
                share your age, organisation and learning goals. We send this
                information to our workshop team through our email delivery
                provider. The team uses it to coordinate your preferred
                sessions, timing changes, seat confirmation and the related
                learning opportunities described on the form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Fee-support review</h2>
              <p className="mt-3">
                Fee-support application details may be shared with a trusted
                reviewer only when the applicant uses the Women&apos;s Empowerment
                fee-support pathway and gives the stated consent. A reviewer may
                contact the applicant directly only when the separate contact
                consent is given. Consent does not guarantee funding or
                admission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Learning resource links</h2>
              <p className="mt-3">
                When you open selected resources in an exercise, your browser can send us a
                click count. We keep daily totals by destination website. These counts contain
                no names, IP addresses or individual browsing histories. We skip counting when
                the request carries Global Privacy Control or Do Not Track.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">Third-party communication services</h2>
              <p className="mt-3">
                WhatsApp and your email provider process messages under their
                own privacy terms. Pakish Institute does not control those
                services. You can choose email instead of WhatsApp, or contact
                the team before sharing application details.
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
