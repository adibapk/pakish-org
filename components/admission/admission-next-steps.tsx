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
            Request Received
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Next Steps for Enrollment
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thank you, {request.fullName}. Your admission request for{" "}
            <span className="font-medium text-foreground">
              {request.courseTitle}
            </span>{" "}
            is saved (status: {request.leadStatus}). Follow these steps to
            complete enrollment.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Reference: {request.clientRequestId}
          </p>
        </div>

        <Card className="border-secondary">
          <CardHeader>
            <CardTitle>Enrollment Journey</CardTitle>
            <CardDescription>
              From admission request to class schedule confirmation.
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
                <p className="pt-1 text-foreground">{item.title}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link
              href="/payment-methods"
              onClick={() =>
                trackEvent("payment_page_visited", {
                  request_id: request.clientRequestId,
                  source: "admission_next_steps",
                })
              }
            >
              View Payment Methods
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
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
              Continue on WhatsApp
            </a>
          </Button>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl">Payment Confirmation</CardTitle>
            <CardDescription>
              {ADMISSION_PAGE_COPY.paymentConfirmNote}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              Include your name, course, amount, transaction reference, and
              request ID ({request.clientRequestId}) with the screenshot.
            </p>
          </CardContent>
        </Card>

        <PaymentProofForm
          requestId={request.clientRequestId}
          courseTitle={request.courseTitle}
        />

        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/courses">Browse more courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
