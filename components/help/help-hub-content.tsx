import { HELP_INDEX, HELP_UI_VERIFIED_DATE } from "@/lib/help/guides";
import Link from "next/link";

export function HelpHubContent() {
  return (
    <article className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 text-lg tracking-wider text-primary">Help</p>
        <h1 className="text-3xl font-bold md:text-5xl">Help &amp; guides</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Clear answers for applying, paying after fee confirmation, and using
          Pakish Academy. Apply without an invitation. Academy access is issued
          after admission approval and enrollment.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Last UI-verified: {HELP_UI_VERIFIED_DATE}
        </p>

        <ol className="mt-10 space-y-4">
          {HELP_INDEX.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl border border-secondary bg-card px-5 py-4 transition-colors hover:border-primary/40"
              >
                <span className="font-semibold text-foreground">{item.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {item.summary}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-muted-foreground">
          Need a human? Email{" "}
          <a className="underline" href="mailto:admin@pakish.org">
            admin@pakish.org
          </a>{" "}
          or WhatsApp{" "}
          <a
            className="underline"
            href="https://wa.me/923008222456"
            target="_blank"
            rel="noopener noreferrer"
          >
            +92 300 8222456
          </a>
          .
        </p>
      </div>
    </article>
  );
}
