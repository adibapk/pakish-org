import { FooterSection } from "@/components/layout/sections/footer";
import {
  NO_CHANGE_OF_MIND_CORE,
  POLICY_CONTACT_EMAIL,
  POLICY_EFFECTIVE_DATE,
  POLICY_VERSION,
  REFUND_POLICY_PATH,
} from "@/lib/legal/policy-meta";
import { ogImagePath } from "@/lib/og";
import { SITE_URL, createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Terms of Training | Pakish Institute",
  description:
    "Terms for Pakish Institute paid training: admission vs enrollment, written fee offers, live Google Meet classes, Academy access, learner conduct, and statutory rights.",
  path: "/terms",
  image: ogImagePath("terms"),
  absoluteTitle: true,
  keywords: [
    "Pakish Institute terms",
    "training terms Pakistan",
    "course enrollment terms",
  ],
});

export default function TermsPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Terms of Training",
        item: `${SITE_URL}/terms`,
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
          <p className="mb-2 text-lg tracking-wider text-primary">Legal</p>
          <h1 className="text-3xl font-bold md:text-5xl">
            Terms of Training
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            These Terms explain how Pakish Institute offers paid professional
            training. They apply from the effective date below to new offers and
            acceptances. They do not change agreements already accepted for a
            different policy version.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Version {POLICY_VERSION} · Effective {POLICY_EFFECTIVE_DATE} · Contact{" "}
            <a
              href={`mailto:${POLICY_CONTACT_EMAIL}`}
              className="text-primary hover:underline"
            >
              {POLICY_CONTACT_EMAIL}
            </a>
          </p>

          <div className="mt-10 space-y-9 text-base leading-7 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground">
                1. Who we are
              </h2>
              <p className="mt-3">
                Pakish Institute is the professional training brand of Pakish
                Group (Est. 1999). These Terms cover paid training arranged
                through pakish.org, related payment channels, and Academy access
                after enrollment. We do not claim educational accreditation,
                Sindh Board of Technical Education affiliation, or regulator
                approval on this website. Training location and contact details
                appear on the public site (including Gulshan-e-Iqbal, Karachi,
                for in-person formats when scheduled).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                2. Admission request vs paid enrollment
              </h2>
              <p className="mt-3">
                Submitting the public admission form is free and does not reserve
                a seat, create an invoice, verify payment, or open an Academy
                account. Enrollment begins only after you accept a dated written
                fee offer and Pakish verifies payment. Academy registration stays
                invite-only after approval and enrollment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                3. Written offer and acceptance
              </h2>
              <p className="mt-3">
                Before you pay, Pakish provides a dated written offer (email or
                WhatsApp) stating the course, format, session plan or count when
                known, final fee, payment instructions, and the policy version
                that applies. Your clear written acceptance of that offer—not
                the admission form alone—is the commercial acceptance step.
                Marketing “starting from” prices are not your final fee.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                4. How training is delivered
              </h2>
              <p className="mt-3">
                Live online classes use Google Meet unless your written offer
                states another platform. In-center (Karachi) or team/onsite
                formats apply only when listed in your offer. A recording is
                included only if the offer expressly says so. Missed live
                sessions on the learner’s side are not treated as Pakish failing
                to deliver the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                5. Fees, payment proof, and cancellation
              </h2>
              <p className="mt-3">
                Pay only to the verified recipient named in your written offer.
                Uploading a receipt or screenshot is not payment verification or
                enrollment. Fees and cancellation are governed by the{" "}
                <Link
                  href={REFUND_POLICY_PATH}
                  className="font-medium text-primary hover:underline"
                >
                  Payment &amp; Cancellation Policy
                </Link>{" "}
                (version linked in your offer). In short: {NO_CHANGE_OF_MIND_CORE}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                6. Custom team training
              </h2>
              <p className="mt-3">
                Office, team, or onsite programs use a clear statement of work or
                accepted written proposal covering scope, dates, fee, and
                cancellation. That document cannot remove remedies required by
                applicable law if Pakish fails to deliver what was agreed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                7. Learner conduct and materials
              </h2>
              <p className="mt-3">
                Provide accurate contact details, treat instructors and classmates
                respectfully, and do not share Academy credentials or
                redistribute teaching materials. Pakish and its licensors keep
                ownership of course materials; you receive a personal learning
                licence for the access period stated in your offer. You keep
                rights in your own submitted work; Pakish may use it only as
                needed to review or grade it unless you give separate consent for
                other uses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                8. Recordings, privacy, and AI tools
              </h2>
              <p className="mt-3">
                Identifiable class recordings require advance notice and
                appropriate consent or alternatives. Do not paste other people’s
                confidential data into consumer AI tools. See the{" "}
                <Link href="/privacy" className="font-medium text-primary hover:underline">
                  Privacy Notice
                </Link>{" "}
                for how admission and contact information is handled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                9. Outcomes we do not guarantee
              </h2>
              <p className="mt-3">
                Training does not guarantee a job, income, exam score,
                accreditation, or certificate unless your written offer expressly
                includes a specific certificate or exam-prep deliverable. This
                does not reduce Pakish’s duty to deliver the agreed training with
                reasonable care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                10. Concerns and complaints
              </h2>
              <p className="mt-3">
                Email{" "}
                <a
                  href={`mailto:${POLICY_CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {POLICY_CONTACT_EMAIL}
                </a>{" "}
                with your offer or lead reference. We aim to acknowledge within
                two business days and respond with a proposed next step within
                seven business days after we have the needed details. These Terms
                do not remove access to remedies available under applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                11. Changes
              </h2>
              <p className="mt-3">
                New policy versions apply prospectively. The version named in
                your accepted written offer continues to apply to that offer.
                Non-excludable rights under applicable law remain available
                regardless of website updates.
              </p>
            </section>
          </div>

          <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-xl font-bold text-foreground">Related pages</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                <Link
                  href={REFUND_POLICY_PATH}
                  className="font-medium text-primary hover:underline"
                >
                  Payment &amp; Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="font-medium text-primary hover:underline">
                  Payment methods
                </Link>
              </li>
              <li>
                <Link href="/help/students" className="font-medium text-primary hover:underline">
                  Student Guide
                </Link>
              </li>
              <li>
                <Link href="/admission" className="font-medium text-primary hover:underline">
                  Apply for admission
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <FooterSection />
    </>
  );
}
