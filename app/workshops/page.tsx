import { CalendarDays, Clock, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FooterSection } from "@/components/layout/sections/footer";
import { Button } from "@/components/ui/button";
import { WorkshopRegistrationForm } from "@/components/workshops/registration-form";
import { getCoursePath } from "@/lib/courses";
import { createPageMetadata } from "@/lib/seo";
import {
  formatSessionTime,
  formatWorkshopDay,
  getUpcomingWorkshopDays,
  workshop,
  WORKSHOP_EMAIL,
  WORKSHOP_PATH,
  WORKSHOP_PHONE,
  WORKSHOP_WHATSAPP,
} from "@/lib/workshops";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Free AI and English Workshops in Karachi",
  description:
    "Register for free introductory workshops in AI and smart tools, English speaking and communication, and NLP at Pakish Institute's Gulshan-e-Iqbal campus.",
  path: WORKSHOP_PATH,
});

export default function WorkshopsPage() {
  const workshopDays = getUpcomingWorkshopDays();
  return (
    <>
      <div>
        <header className="bg-[#073c32] text-white">
          <div className="container py-12 sm:py-16">
            <p className="mb-4 text-sm font-semibold text-emerald-200">Pakish Institute · Karachi</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Free Weekend Workshops in Gulshan-e-Iqbal, Karachi</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-emerald-50 sm:text-lg">
              Explore AI tools, practise speaking English and build stronger communication skills.
              All sessions are introductory, with free entry and limited seats.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-emerald-50">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                Every Saturday and Sunday
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                {workshop.venue}
              </span>
            </div>
            <Button asChild size="lg" className="mt-7 bg-white text-[#073c32] hover:bg-emerald-50">
              <Link href="#registration">Register for free</Link>
            </Button>
          </div>
        </header>
        <div className="container grid items-start gap-6 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-8">
          <aside aria-labelledby="schedule-heading" className="rounded-2xl border bg-card p-5 sm:p-6">
            <h2 id="schedule-heading" className="text-xl font-bold tracking-tight">Workshop schedule</h2>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Suggested timings* · Pakistan time
            </p>
            <div className="mt-4 text-sm">
              <p className="font-semibold">Upcoming dates to request</p>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                {workshopDays.map((date) => (
                  <li key={date}><time dateTime={date}>{formatWorkshopDay(date)}</time></li>
                ))}
              </ul>
            </div>
            <ul className="mt-4 divide-y">
              {workshop.sessions.map((session) => (
                <li key={session.id} className="py-3">
                  <p className="text-sm font-semibold text-primary">{formatSessionTime(session)}</p>
                  <p className="mt-1 font-medium">{session.title}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-muted px-3 py-3 text-sm leading-relaxed text-muted-foreground">
              * After submitting this form, please stay in touch on WhatsApp at{" "}
              <a href={WORKSHOP_WHATSAPP} className="font-semibold text-primary underline">{WORKSHOP_PHONE}</a>{" "}
              to confirm your seat and coordinate any changes to the suggested timings.
              Please arrive 10–15 minutes before your confirmed session.
            </p>
            <div className="mt-5 border-t pt-4 text-sm">
              <p className="font-semibold">{workshop.venue}</p>
              <p className="mt-1 text-muted-foreground">{workshop.address}</p>
              <a href={WORKSHOP_WHATSAPP} className="mt-3 flex w-fit items-center gap-2 font-medium text-primary hover:underline">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {WORKSHOP_PHONE}
              </a>
              <a href={`mailto:${WORKSHOP_EMAIL}`} className="mt-2 inline-block text-primary hover:underline">{WORKSHOP_EMAIL}</a>
            </div>
          </aside>
          <WorkshopRegistrationForm dates={workshopDays} />
        </div>
        <section aria-labelledby="continue-learning" className="container pb-12">
          <div className="rounded-2xl border bg-card p-6 sm:p-8">
            <h2 id="continue-learning" className="text-2xl font-bold">Continue learning after the workshop</h2>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2">
              <li>
                <Link className="font-medium text-primary underline" href={getCoursePath("ai-productivity")}>
                  AI Productivity and Automation course
                </Link>
                <p className="mt-1 text-muted-foreground">Practise using AI for documents, research and recurring tasks in a live course.</p>
              </li>
              <li>
                <Link className="font-medium text-primary underline" href={getCoursePath("business-english-professional-communication")}>
                  Business English and Professional Communication course
                </Link>
                <p className="mt-1 text-muted-foreground">Work on emails, interviews and presentations in training tailored to your goals.</p>
              </li>
            </ul>
            <Link className="mt-5 inline-block text-primary underline" href="/course-fees">Compare paid course fees and duration</Link>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
