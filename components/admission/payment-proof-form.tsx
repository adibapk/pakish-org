"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

interface PaymentProofFormProps {
  requestId: string;
  courseTitle: string;
}

export function PaymentProofForm({
  requestId,
  courseTitle,
}: PaymentProofFormProps) {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState<string | undefined>();
  const [dataUrl, setDataUrl] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onFileChange(file: File | undefined) {
    setError(null);
    if (!file) {
      setFileName(undefined);
      setDataUrl(undefined);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image screenshot (PNG, JPG, or WebP).");
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setError("Screenshot is too large (max 1.5 MB). Prefer WhatsApp for large files.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setDataUrl(typeof reader.result === "string" ? reader.result : undefined);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError(null);

    try {
      const response = await fetch("/api/admission/payment-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          referenceNumber,
          notes: notes || undefined,
          screenshotDataUrl: dataUrl,
          screenshotFileName: fileName,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit payment proof.");
      }

      trackEvent("payment_proof_submitted", {
        request_id: requestId,
        course: courseTitle,
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Payment proof received</CardTitle>
          <CardDescription>
            Status set to <strong>Submitted</strong>. Our team will verify and
            update your enrollment.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-secondary">
      <CardHeader>
        <CardTitle className="text-xl">Submit Payment Proof</CardTitle>
        <CardDescription>
          Optional for now — you can also send the screenshot on WhatsApp.
          Reference number helps faster verification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment-ref">Payment reference number</Label>
            <Input
              id="payment-ref"
              value={referenceNumber}
              onChange={(event) => setReferenceNumber(event.target.value)}
              placeholder="Transaction ID / JazzCash ref / bank reference"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-shot">Screenshot (optional)</Label>
            <Input
              id="payment-shot"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) => onFileChange(event.target.files?.[0])}
            />
            {fileName && (
              <p className="text-xs text-muted-foreground">Selected: {fileName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-notes">Notes (optional)</Label>
            <Textarea
              id="payment-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Amount paid, method used, etc."
              className="min-h-[80px]"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Submitting…" : "Submit for verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
