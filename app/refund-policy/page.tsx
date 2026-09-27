import { FooterSection } from "@/components/layout/sections/footer";
import {
  BILLING_CONTACT_EMAIL,
  NO_CHANGE_OF_MIND_CORE,
  POLICY_CONTACT_EMAIL,
  POLICY_EFFECTIVE_DATE,
  POLICY_VERSION,
  TERMS_PATH,
} from "@/lib/legal/policy-meta";
import { ogImagePath } from "@/lib/og";
import { SITE_URL, createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Payment & Cancellation Policy | Pakish Institute",
  description:
    "No change-of-mind refund after payment for Pakish Institute courses, with statutory remedies preserved if agreed training is not provided or is faulty.",
  path: "/refund-policy",
  image: ogImagePath("refund-policy"),
  absoluteTitle: true,
  keywords: [
    "Pakish Institute refund policy",
    "course cancellation Pakistan",
    "training payment policy",
  ],
});

export default function RefundPolicyPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Payment & Cancellation Policy",
        item: `${SITE_URL}/refund-policy`,
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
          <p className="mb-2 text-lg tracking-wider text-primary">
            Fees &amp; cancellation
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">
            Payment &amp; Cancellation Policy
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Read this policy and your dated written fee offer before you pay.
            Public payment pages are informational until staff confirm the
            amount and channel for your offer.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Version {POLICY_VERSION} · Effective {POLICY_EFFECTIVE_DATE} ·{" "}
            <Link href={TERMS_PATH} className="text-primary hover:underline">
              Terms of Training
            </Link>
          </p>

          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-foreground">
              Core rule (before you pay)
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground">
              {NO_CHANGE_OF_MIND_CORE}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Your written offer must show the exact fee, course or session
              details, and this policy version before payment is requested.
            </p>
          </div>

          <div className="mt-10 space-y-9 text-base leading-7 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-bold text-foreground">
                1. When this policy applies
              </h2>
              <p className="mt-3">
                It applies to individual paid commercial courses and to custom
                team training when your accepted offer or statement of work
                points to this version. Women&apos;s Empowerment fee-support
                arrangements follow their own review pathway and any sponsor
                terms; any legally required refund relates only to amounts you
                personally paid.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                2. No discretionary change-of-mind refund after payment
              </h2>
              <p className="mt-3">
                Once payment is made, Pakish does not provide a voluntary refund
                because you changed your mind, have a schedule conflict, missed
                a live session, or cancel on your side—including before the
                first class. A missed session caused by the learner is not
                treated as Pakish failing to provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                3. Transfers and rescheduling
              </h2>
              <p className="mt-3">
                Staff may, at Pakish&apos;s discretion, offer a transfer to
                another suitable cohort or course. A transfer is not a cash
                refund and does not replace a monetary remedy when applicable
                law requires one.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                4. If Pakish cancels or fails to deliver
              </h2>
              <p className="mt-3">
                If Pakish cancels your cohort, fails to provide the agreed
                training, materially misrepresents it, or provides a faulty
                service, the change-of-mind rule does not apply. We will assess
                the remedy required by applicable law (which may include a
                refund, price reduction, or other relief). We do not limit you
                to “credit only” when the law requires a different remedy. A
                replacement cohort is offered only if you accept it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                5. Material changes to your offer
              </h2>
              <p className="mt-3">
                If format, confirmed instructor, schedule, or syllabus changes
                materially from your written offer, we will notify you promptly
                and discuss an appropriate remedy. We will not silently
                substitute a recorded course for promised live classes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                6. How to raise a payment or cancellation concern
              </h2>
              <p className="mt-3">
                Email{" "}
                <a
                  href={`mailto:${POLICY_CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {POLICY_CONTACT_EMAIL}
                </a>{" "}
                or{" "}
                <a
                  href={`mailto:${BILLING_CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {BILLING_CONTACT_EMAIL}
                </a>{" "}
                with your name, course, offer or lead reference, amount paid,
                and what you are asking for. We aim to acknowledge within two
                business days and decide within seven business days after we
                have the needed details. Any approved or legally required refund
                is targeted within fourteen business days via the original
                channel where practicable (bank posting times may vary). You
                will receive a written reason for the decision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                7. Payment proof is not verification
              </h2>
              <p className="mt-3">
                Sending a screenshot or uploading a receipt helps staff review
                your payment. It does not by itself verify payment or enroll you.
                Use only the recipient details in your written offer—not account
                numbers recalled from older chats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">
                8. Statutory rights
              </h2>
              <p className="mt-3">
                Nothing in this policy excludes or limits liability that cannot
                be excluded under applicable law for faulty or defective
                services, or for false, deceptive, or misleading representations.
                Pakistan-qualified counsel review of this published wording
                remains available to the owner; this page is not a claim that a
                lawyer has certified the draft.
              </p>
            </section>
          </div>

          <div className="mt-12 rounded-2xl border border-secondary bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Next steps</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                <Link href="/admission" className="font-medium text-primary hover:underline">
                  Apply for admission
                </Link>{" "}
                (no payment required to apply)
              </li>
              <li>
                <Link href="/payment-methods" className="font-medium text-primary hover:underline">
                  Payment methods
                </Link>{" "}
                (pay only after a dated written offer)
              </li>
              <li>
                <Link href={TERMS_PATH} className="font-medium text-primary hover:underline">
                  Terms of Training
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
