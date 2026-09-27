import {
  TEACHER_GUIDE_META,
  TEACHER_GUIDE_SECTIONS,
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
    </section>
  );
}

export function TeacherGuideContent() {
  return (
    <article className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-sm">
          <Link href="/help" className="text-primary hover:underline">
            Help
          </Link>
          <span className="text-muted-foreground"> / Teacher Guide</span>
        </p>
        <h1 className="text-3xl font-bold md:text-5xl">{TEACHER_GUIDE_META.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          {TEACHER_GUIDE_META.description}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Last UI-verified: {TEACHER_GUIDE_META.lastUiVerified}. Instructor UI
          steps marked Not yet verified await Prompt 21E Academy role-shell
          acceptance.
        </p>
        <div className="mt-12 space-y-10">
          {TEACHER_GUIDE_SECTIONS.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Contact: {TEACHER_GUIDE_META.contact}. Operational runbooks stay in
          private repository docs, not on this page.
        </p>
      </div>
    </article>
  );
}
