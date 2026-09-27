import {
  STUDENT_GUIDE_META,
  STUDENT_GUIDE_SECTIONS,
  STUDENT_JOURNEY_STATES,
  type HelpGuideSection,
} from "@/lib/help/guides";
import Link from "next/link";

function SectionBlock({ section }: { section: HelpGuideSection }) {
  return (
    <section id={section.id} className="scroll-mt-24 border-t border-secondary pt-8">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 className="text-xl font-semibold md:text-2xl">{section.title}</h2>
        {section.status === "not-yet-verified" ? (
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Not yet verified
          </span>
        ) : null}
      </div>
      <div className="mt-4 space-y-3 text-muted-foreground">
        {section.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {section.qa?.length ? (
        <dl className="mt-6 space-y-4">
          {section.qa.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-foreground">{item.question}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

export function StudentGuideContent() {
  return (
    <article className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm">
          <Link href="/help" className="text-primary hover:underline">
            Help
          </Link>
          <span className="text-muted-foreground"> / Student Guide</span>
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">{STUDENT_GUIDE_META.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {STUDENT_GUIDE_META.description}
        </p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-foreground">Audience</dt>
            <dd className="text-muted-foreground">{STUDENT_GUIDE_META.audience}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Last UI-verified</dt>
            <dd className="text-muted-foreground">
              {STUDENT_GUIDE_META.lastUiVerified}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-foreground">Expected outcome</dt>
            <dd className="text-muted-foreground">
              {STUDENT_GUIDE_META.expectedOutcome}
            </dd>
          </div>
        </dl>

        <section className="mt-12 rounded-2xl border border-secondary bg-muted/30 p-6">
          <h2 className="text-lg font-semibold">Journey states</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Application is not enrollment. Academy invite-only controls account
            creation, not the public application form.
          </p>
          <ol className="mt-6 space-y-4">
            {STUDENT_JOURNEY_STATES.map((state, index) => (
              <li key={state.id} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{state.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {state.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 space-y-10">
          {STUDENT_GUIDE_SECTIONS.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>

        <section className="mt-12 border-t border-secondary pt-8">
          <h2 className="text-xl font-semibold">Troubleshooting &amp; contact</h2>
          <p className="mt-3 text-muted-foreground">{STUDENT_GUIDE_META.contact}</p>
          <p className="mt-4">
            <Link href="/admission" className="font-medium text-primary hover:underline">
              Apply for admission
            </Link>
            {" · "}
            <Link href="/help" className="font-medium text-primary hover:underline">
              Help index
            </Link>
          </p>
        </section>
      </div>
    </article>
  );
}
