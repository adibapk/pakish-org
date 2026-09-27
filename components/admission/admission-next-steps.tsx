"use client";

import { PaymentProofForm } from "@/components/admission/payment-proof-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ADMISSION_NEXT_STEPS,
  ADMISSION_PAGE_COPY,
  buildAdmissionWhatsAppUrl,
  type AdmissionRequestPayload,
} from "@/lib/admission";
import { trackEvent } from "@/lib/analytics";
import { PAYMENT_CONFIRMATION } from "@/lib/payment-methods";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

interface AdmissionNextStepsProps {
  request: AdmissionRequestPayload;
}

export function AdmissionNextSteps({ request }: AdmissionNextStepsProps) {
  const whatsappHref = buildAdmissionWhatsAppUrl(request);
  const emailHref = `mailto:${PAYMENT_CONFIRMATION.emailPreferred}`;

  return (
    <section className="container pb-16 pt-12 sm:pb-24 sm:pt-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-8" />
          </div>
          <p className="mb-2 text-lg tracking-wider text-primary">
            Application received
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            What happens next
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thank you, {request.fullName}. Your admission request for{" "}
            <span className="font-medium text-foreground">
              {request.courseTitle}
            </span>{" "}
            is saved (status: {request.leadStatus}). This is not yet an accepted
            seat, fee invoice, verified payment, or Academy enrollment.
          </p>
          <p className="mt-3 rounded-lg border border-secondary bg-muted/40 px-4 py-3 text-sm font-medium text-foreground">
            Lead reference: {request.clientRequestId}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {ADMISSION_PAGE_COPY.noInviteNote}
          </p>
        </div>

        <Card className="border-secondary">
          <CardHeader>
            <CardTitle>Review before payment</CardTitle>
            <CardDescription>
              Our team contacts you first. Pay only after the fee and
              instructions are confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ADMISSION_NEXT_STEPS.map((item) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-xl border border-secondary bg-muted/30 p-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {item.step}
                </div>
                <div className="pt-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  {"detail" in item && item.detail ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_clicked", {
                  context: "admission_continue",
                  request_id: request.clientRequestId,
                })
              }
            >
              <MessageCircle className="mr-2 size-4" />
              Message us on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/help/students">Read the Student Guide</Link>
          </Button>
        </div>

        <Card className="border-secondary">
          <CardHeader>
            <CardTitle className="text-xl">Payment methods (informational)</CardTitle>
            <CardDescription>
              {ADMISSION_PAGE_COPY.paymentConfirmNote}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {ADMISSION_PAGE_COPY.policyRequestNote}{" "}
              <Link
                href="/terms"
                className="font-medium text-primary hover:underline"
              >
                Terms
              </Link>
              {" · "}
              <Link
                href="/refund-policy"
                className="font-medium text-primary hover:underline"
              >
                Payment &amp; Cancellation
              </Link>
            </p>
            <Button asChild variant="outline">
              <Link
                href="/payment-methods"
                onClick={() =>
                  trackEvent("payment_page_visited", {
                    request_id: request.clientRequestId,
                    source: "admission_next_steps",
                  })
                }
              >
                View payment methods
              </Link>
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="justify-start">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp: {PAYMENT_CONFIRMATION.whatsappDisplay}
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href={emailHref}>
                  <Mail className="mr-2 size-4" />
                  Email: {PAYMENT_CONFIRMATION.emailPreferred}
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              After staff confirms your fee, include your name, course, amount,
              transaction reference, and request ID ({request.clientRequestId})
              with any screenshot.
            </p>
          </CardContent>
        </Card>

        <Card className="border-dashed border-secondary">
          <CardHeader>
            <CardTitle className="text-lg">
              Optional: payment proof after fee confirmation
            </CardTitle>
            <CardDescription>
              Use this only when our team has confirmed your amount and asked
              you to pay. Uploading proof does not verify payment or enroll you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentProofForm
              requestId={request.clientRequestId}
              courseTitle={request.courseTitle}
            />
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <Button asChild variant="ghost">
            <Link href="/courses">Browse more courses</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            {ADMISSION_PAGE_COPY.academyAccessNote}
          </p>
        </div>
      </div>
    </section>
  );
}
