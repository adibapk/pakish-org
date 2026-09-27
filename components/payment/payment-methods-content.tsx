"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NO_CHANGE_OF_MIND_CORE,
  POLICY_VERSION,
  REFUND_POLICY_PATH,
  TERMS_PATH,
} from "@/lib/legal/policy-meta";
import {
  PAYONEER,
  PAYMENT_CONFIRMATION,
  QR_PAYMENT_METHODS,
  STUDENT_PAYMENT_STEPS,
  buildPaymentWhatsAppUrl,
  type PaymentField,
  type QrPaymentMethod,
} from "@/lib/payment-methods";
import { cn } from "@/lib/utils";
import {
  Banknote,
  CheckCircle,
  Copy,
  Download,
  Globe,
  Mail,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!navigator.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — keep UI stable */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex shrink-0 items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
      aria-label={`Copy ${label}: ${value}`}
    >
      {copied ? (
        <CheckCircle className="size-3" aria-hidden="true" />
      ) : (
        <Copy className="size-3" aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function PaymentDetailRow({ field }: { field: PaymentField }) {
  const showCopy = field.copyable !== false;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 rounded-lg bg-secondary/40 px-3 py-2.5",
        showCopy
          ? "min-[400px]:grid-cols-[minmax(5.5rem,auto)_1fr_auto] min-[400px]:items-start min-[400px]:gap-x-3"
          : "min-[400px]:grid-cols-[minmax(5.5rem,auto)_1fr] min-[400px]:items-start min-[400px]:gap-x-3"
      )}
    >
      <span className="pt-0.5 text-xs font-semibold text-muted-foreground">
        {field.label}
      </span>
      <span
        className={cn(
          "break-all text-sm font-semibold leading-snug text-foreground",
          showCopy && "font-mono"
        )}
        dir="ltr"
      >
        {field.value}
      </span>
      {showCopy && (
        <div className="min-[400px]:justify-self-end min-[400px]:pt-0.5">
          <CopyButton value={field.value} label={field.label} />
        </div>
      )}
    </div>
  );
}

function methodIcon(id: string) {
  if (id === "meezan-bank") {
    return <Banknote className="size-6 text-primary" aria-hidden="true" />;
  }
  if (id === "jazzcash-raast") {
    return <Smartphone className="size-6 text-primary" aria-hidden="true" />;
  }
  return <Globe className="size-6 text-primary" aria-hidden="true" />;
}

function PaymentMethodCard({ method }: { method: QrPaymentMethod }) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
              {methodIcon(method.id)}
            </div>
            <CardTitle className="text-lg leading-tight sm:text-xl">
              {method.title}
            </CardTitle>
          </div>
          <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            {method.badge}
          </span>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {method.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Payment details
          </p>
          <div className="space-y-2">
            {method.fields.map((field) => (
              <PaymentDetailRow key={field.label} field={field} />
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-secondary pt-4">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Scan to pay
          </p>
          <div className="mx-auto flex w-full max-w-[236px] flex-col items-center">
            <div className="w-full rounded-xl border border-secondary p-2">
              <div className="rounded-lg bg-white p-2">
                {/* Payment QR must remain pixel-accurate — do not route through next/image. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={method.qrImageSrc}
                  alt={method.qrImageAlt}
                  width={220}
                  height={220}
                  className="mx-auto block h-auto w-full max-w-[220px] object-contain"
                  decoding="async"
                />
              </div>
            </div>
            <p className="mt-2 min-h-[2.5rem] text-center text-xs leading-relaxed text-muted-foreground">
              {method.qrCaption}
            </p>
            <a
              href={method.qrImageSrc}
              download={method.qrDownloadName}
              aria-label={method.qrDownloadAriaLabel}
              className="mt-1 inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-secondary bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Download className="size-3.5" aria-hidden="true" />
              Download QR
            </a>
          </div>
        </div>

        <p className="rounded-lg bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
          {method.note}
        </p>
      </CardContent>
    </Card>
  );
}

export function PaymentMethodsContent() {
  const whatsappUrl = buildPaymentWhatsAppUrl();
  const payoneerConfirmUrl = buildPaymentWhatsAppUrl(
    "Hello Pakish Institute, I have paid my course fee through Payoneer. Student name: ____. Course: ____. Payoneer Transaction ID: ____."
  );
  const payoneerRequestUrl = buildPaymentWhatsAppUrl(
    "Hello Pakish Institute, please send me a Payoneer payment request for my course fee. Student name: ____. Course: ____. Amount: ____. Currency: ____. Payer email: ____."
  );

  useEffect(() => {
    trackEvent("payment_page_visited", { source: "payment_methods_page" });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="container py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-lg tracking-wider text-primary">
            Admission &amp; Fees
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">
            Course Fee Payment Methods
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            This page is for <strong className="text-foreground">Pakish Institute course fee payments only</strong>.
            Choose a method below, then share your payment confirmation so we can verify admission.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Confirm payment on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admission">Apply for admission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tip */}
      <section className="border-y border-primary/20 bg-primary/5 py-5">
        <div className="container mx-auto max-w-3xl px-4 text-sm text-muted-foreground">
          <p>
            <strong className="text-primary">For students:</strong> Use any
            verified method below for course fees. After paying, share your
            screenshot so the team can verify and confirm your admission.
            Uploading proof is not payment verification.
          </p>
        </div>
      </section>

      {/* Prepayment policy disclosure — must appear before bank/QR details */}
      <section
        id="payment-policy-notice"
        className="container py-10 sm:py-12"
        aria-labelledby="payment-policy-heading"
        data-payment-section="policy-notice"
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-card p-5 sm:p-6">
          <h2
            id="payment-policy-heading"
            className="text-xl font-bold text-foreground sm:text-2xl"
          >
            Read before you pay
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pay only after you have a dated written fee offer from Pakish staff
            that states your exact amount, course or session details, and policy
            version <strong className="text-foreground">{POLICY_VERSION}</strong>.
            Public QR codes and account details below are informational channels—not
            an invoice by themselves.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
            {NO_CHANGE_OF_MIND_CORE}
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            <Link href={TERMS_PATH} className="text-primary hover:underline">
              Terms of Training
            </Link>
            <Link
              href={REFUND_POLICY_PATH}
              className="text-primary hover:underline"
            >
              Payment &amp; Cancellation Policy
            </Link>
            <Link href="/help/students" className="text-primary hover:underline">
              Student Guide
            </Link>
          </p>
        </div>
      </section>

      {/* Payment methods */}
      <section
        id="payment-channels"
        className="container py-14 sm:py-16"
        aria-labelledby="payment-methods-heading"
        data-payment-section="channels"
      >
        <div className="mb-10 text-center">
          <h2
            id="payment-methods-heading"
            className="text-3xl font-bold md:text-4xl"
          >
            Choose Your Payment Method
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Use these verified channels for your Pakish Institute course fees.
            Bank transfer and JazzCash are typically the fastest options in
            Pakistan.
          </p>
        </div>

        <div
          className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          data-testid="qr-payment-methods-grid"
        >
          {QR_PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard key={method.id} method={method} />
          ))}
        </div>

        {/* Payoneer */}
        <div
          id="payoneer"
          className="mx-auto mt-8 max-w-6xl"
          data-payment-section="payoneer"
          aria-labelledby="payoneer-heading"
        >
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/30">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Globe className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle id="payoneer-heading" className="text-xl md:text-2xl">
                      Payoneer International Payment
                    </CardTitle>
                    <CardDescription className="mt-2 max-w-3xl text-sm leading-relaxed">
                      Pay through your existing Payoneer account or ask Pakish
                      Institute to issue a secure payment request for your
                      course fee.
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                    International
                  </span>
                  <span className="rounded-full border border-secondary bg-secondary/50 px-2.5 py-1 text-xs font-bold">
                    Manual Verification
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <article className="rounded-xl border border-secondary bg-card/80 p-4 sm:p-5">
                  <h3 className="mb-3 text-base font-bold">
                    Send from your Payoneer account
                  </h3>
                  <div className="space-y-2">
                    <PaymentDetailRow
                      field={{
                        label: "Recipient email",
                        value: PAYONEER.recipientEmail,
                      }}
                    />
                    <PaymentDetailRow
                      field={{
                        label: "Payment path",
                        value: PAYONEER.paymentPath,
                        copyable: false,
                      }}
                    />
                    <PaymentDetailRow
                      field={{
                        label: "Reference",
                        value: PAYONEER.referenceHint,
                        copyable: false,
                      }}
                    />
                    <PaymentDetailRow
                      field={{
                        label: "Confirmation",
                        value: PAYONEER.confirmationHint,
                        copyable: false,
                      }}
                    />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Before confirming, verify the recipient details shown by
                    Payoneer. This option is available only when your Payoneer
                    account supports payments to another Payoneer account.
                  </p>
                  <Button asChild className="mt-4 w-full">
                    <a
                      href={payoneerConfirmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send payment confirmation on WhatsApp
                    </a>
                  </Button>
                </article>

                <article className="flex flex-col rounded-xl border border-secondary bg-card/80 p-4 sm:p-5">
                  <h3 className="mb-3 text-base font-bold">
                    Ask for a secure Payoneer request
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Send your student name, course, amount, currency, and payer
                    email. We will issue a fee-specific Payoneer payment request.
                  </p>
                  <div className="mt-auto space-y-3 pt-5">
                    <Button asChild className="w-full">
                      <a
                        href={payoneerRequestUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Request via WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={`mailto:${PAYMENT_CONFIRMATION.emailPreferred}?subject=${encodeURIComponent(
                          "Payoneer payment request — course fee"
                        )}`}
                      >
                        Email {PAYMENT_CONFIRMATION.emailPreferred}
                      </a>
                    </Button>
                  </div>
                </article>
              </div>
              <p className="mt-5 rounded-xl border border-secondary bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                Payoneer payments are manually verified. Please provide the
                Transaction ID and receipt. Admission is confirmed after
                verification.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Student instructions */}
      <section
        id="how-to-pay"
        className="border-t border-secondary bg-secondary/20 py-14 sm:py-16"
        aria-labelledby="how-to-pay-heading"
        data-payment-section="instructions"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2
              id="how-to-pay-heading"
              className="text-2xl font-bold md:text-3xl"
            >
              Student Payment Instructions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pay only after staff confirms your fee. Proof upload is not
              automatic verification.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STUDENT_PAYMENT_STEPS.map((item) => (
              <li
                key={item.step}
                className="rounded-xl border border-secondary bg-card p-5"
              >
                <span className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </span>
                <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact / confirmation */}
      <section
        id="payment-confirmation"
        className="container py-14 sm:py-16"
        aria-labelledby="confirmation-heading"
        data-payment-section="confirmation"
      >
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <h2
              id="confirmation-heading"
              className="text-2xl font-bold md:text-3xl"
            >
              Payment Confirmation
            </h2>
            <p className="mt-3 text-muted-foreground">
              After paying your course fee, share the payment screenshot with our
              team. We will verify and confirm your admission.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="mb-1 flex items-center gap-2 font-bold">
                  <MessageCircle className="size-5 text-primary" aria-hidden="true" />
                  WhatsApp (primary)
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-primary hover:underline"
                >
                  {PAYMENT_CONFIRMATION.whatsappDisplay}
                </a>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2 font-bold">
                  <Mail className="size-5 text-primary" aria-hidden="true" />
                  Email
                </div>
                <p className="text-sm text-muted-foreground">Preferred:</p>
                <a
                  href={`mailto:${PAYMENT_CONFIRMATION.emailPreferred}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {PAYMENT_CONFIRMATION.emailPreferred}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">Alternative:</p>
                <a
                  href={`mailto:${PAYMENT_CONFIRMATION.emailAlternative}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {PAYMENT_CONFIRMATION.emailAlternative}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Send screenshot on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admission">Back to admission form</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
