"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  aiExperienceLevels,
  devices,
  formatWorkshopDay,
  participantCategories,
  workshop,
  workshopConsent,
  WORKSHOP_PHONE,
  WORKSHOP_WHATSAPP,
} from "@/lib/workshops";

const choiceClass =
  "flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5";
const controlClass =
  "mt-0.5 h-4 w-4 shrink-0 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function RadioGroup({
  label,
  name,
  options,
  columns = false,
}: {
  label: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  columns?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className={columns ? "grid gap-2 sm:grid-cols-2" : "grid gap-2"}>
        {options.map((option, index) => (
          <label key={option.value} className={choiceClass}>
            <input type="radio" name={name} value={option.value} required={index === 0} className={controlClass} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function WorkshopRegistrationForm({ dates }: { dates: string[] }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const retry = useRef<{ body: string; id: string } | null>(null);
  const pendingRequest = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (registeredDate) successHeading.current?.focus();
  }, [registeredDate]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRequest.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const sessions = data.getAll("sessions");
    if (field("fullName").length < 2) {
      setError("Please enter your full name.");
      form.querySelector<HTMLInputElement>('[name="fullName"]')?.focus();
      return;
    }
    const whatsapp = field("whatsapp");
    if (!/^\+?[\d ()-]+$/.test(whatsapp) || !/^\d{7,15}$/.test(whatsapp.replace(/\D/g, ""))) {
      setError("Please enter a valid WhatsApp or mobile number.");
      form.querySelector<HTMLInputElement>('[name="whatsapp"]')?.focus();
      return;
    }
    if (sessions.length === 0) {
      setError("Please select at least one workshop.");
      form.querySelector<HTMLInputElement>('[name="sessions"]')?.focus();
      return;
    }

    const preferredDate = field("preferredDate");
    const payload = {
      event: workshop.id,
      fullName: field("fullName"),
      age: field("age") ? Number(field("age")) : null,
      email: field("email"),
      whatsapp,
      organization: field("organization"),
      category: field("category"),
      sessions,
      preferredDate,
      aiExperience: field("aiExperience"),
      device: field("device"),
      learningGoal: field("learningGoal"),
      consent: data.has("consent"),
      website: field("website"),
    };
    const body = JSON.stringify(payload);
    if (retry.current?.body !== body) retry.current = { body, id: crypto.randomUUID() };

    setError("");
    pendingRequest.current = true;
    setPending(true);
    try {
      const response = await fetch("/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, requestId: retry.current.id }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setError(result.error || "We couldn't submit your registration. Please try again.");
        return;
      }
      setRegisteredDate(preferredDate);
    } catch {
      setError("We couldn't submit your registration. Please try again.");
    } finally {
      pendingRequest.current = false;
      setPending(false);
    }
  }

  if (registeredDate) {
    return (
      <section id="registration" className="scroll-mt-28 rounded-2xl border bg-card p-6 sm:p-8">
        <CheckCircle2 aria-hidden="true" className="mb-4 h-9 w-9 text-primary" />
        <h2 ref={successHeading} tabIndex={-1} className="text-2xl font-bold">Registration received</h2>
        <p className="mt-3 text-muted-foreground">
          Your preferred date is {formatWorkshopDay(registeredDate)}. Please stay in touch on
          WhatsApp at {WORKSHOP_PHONE} to confirm your seat and check for timing changes.
        </p>
        <Button asChild className="mt-5">
          <a href={WORKSHOP_WHATSAPP}>Confirm on WhatsApp</a>
        </Button>
      </section>
    );
  }

  return (
    <section id="registration" aria-labelledby="registration-heading" className="scroll-mt-28 rounded-2xl border bg-card p-5 sm:p-8">
      <h2 id="registration-heading" className="text-2xl font-bold tracking-tight">Register for free</h2>
      <p className="mb-6 mt-2 text-sm text-muted-foreground">Choose a date and one or more workshops. Seats are subject to confirmation.</p>
      <form method="post" action="/api/workshops" onSubmit={submit}>
        <fieldset disabled={pending} className="min-w-0 space-y-6">
          <RadioGroup
            label="Preferred date"
            name="preferredDate"
            options={dates.map((date) => ({ value: date, label: formatWorkshopDay(date) }))}
            columns
          />
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">Workshops you want to attend</legend>
            <div className="grid gap-2">
              {workshop.sessions.map((session) => (
                <label className={choiceClass} key={session.id}>
                  <input className={controlClass} type="checkbox" name="sessions" value={session.id} />
                  <span>{session.title}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              <span>Full name</span>
              <Input name="fullName" autoComplete="name" required minLength={2} maxLength={100} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Age <span className="font-normal text-muted-foreground">(optional)</span></span>
              <Input name="age" type="number" inputMode="numeric" min={1} max={120} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>Email address</span>
              <Input name="email" type="email" autoComplete="email" required maxLength={254} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              <span>WhatsApp / mobile number</span>
              <Input name="whatsapp" type="tel" autoComplete="tel" required maxLength={30} />
            </label>
            <label className="space-y-2 text-sm font-medium sm:col-span-2">
              <span>Company / institute <span className="font-normal text-muted-foreground">(if applicable)</span></span>
              <Input name="organization" autoComplete="organization" maxLength={120} />
            </label>
          </div>
          <RadioGroup
            label="Which category describes you?"
            name="category"
            options={participantCategories.map((value) => ({ value, label: value }))}
          />
          <div className="grid gap-5 border-t pt-5 sm:grid-cols-2">
            <RadioGroup
              label="AI experience"
              name="aiExperience"
              options={aiExperienceLevels.map((value) => ({ value, label: value }))}
              columns
            />
            <RadioGroup
              label="Device you can bring"
              name="device"
              options={devices.map((value) => ({ value, label: value }))}
              columns
            />
          </div>
          <label className="block space-y-2 text-sm font-medium">
            <span>What would you most like to learn? <span className="font-normal text-muted-foreground">(optional)</span></span>
            <Textarea className="bg-background" name="learningGoal" rows={3} maxLength={500} />
          </label>
          <div hidden aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="border-t pt-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <input type="checkbox" name="consent" required className={controlClass} />
              <span>{workshopConsent}</span>
            </label>
            <Link href="/privacy" className="ml-7 mt-1 inline-block text-sm text-primary underline underline-offset-2">Privacy notice</Link>
          </div>
          {error && (
            <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm">
              {error} <a href={WORKSHOP_WHATSAPP} className="font-semibold underline">Contact us on WhatsApp</a>
            </p>
          )}
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {pending ? "Submitting…" : "Submit registration"}
          </Button>
        </fieldset>
      </form>
    </section>
  );
}
