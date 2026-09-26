import { FooterSection } from "@/components/layout/sections/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FEE_SUPPORT_ADMISSION_PATH,
  WOMENS_EMPOWERMENT_CONTENT,
} from "@/lib/womens-empowerment";
import { createPageMetadata } from "@/lib/seo";
import { ogImagePath } from "@/lib/og";
import { SITE_URL } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: WOMENS_EMPOWERMENT_CONTENT.metaTitle,
  description: WOMENS_EMPOWERMENT_CONTENT.metaDescription,
  path: "/womens-empowerment",
  image: ogImagePath("womens-empowerment"),
  absoluteTitle: true,
  keywords: [
    "women empowerment through digital skills in Pakistan",
    "women digital skills training Pakistan",
    "need-based fee support IT training",
    "women in tech Pakistan",
  ],
});

export default function WomensEmpowermentPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Women's Empowerment",
        item: `${SITE_URL}/womens-empowerment`,
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
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-lg tracking-wider text-primary">
            Pakish Institute Initiative
          </p>
          <h1 className="text-3xl font-bold md:text-5xl">
            {WOMENS_EMPOWERMENT_CONTENT.h1}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">
            {WOMENS_EMPOWERMENT_CONTENT.heroDescription}
          </p>
        </div>

        <section className="mx-auto mt-14 max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold">Purpose</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {WOMENS_EMPOWERMENT_CONTENT.purpose}
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
            What This Initiative Offers
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {WOMENS_EMPOWERMENT_CONTENT.activities.map((activity) => (
              <Card key={activity.title}>
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {activity.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Get Involved</h2>
          <p className="mt-3 text-muted-foreground">
            Join an upcoming gathering, explore commercial skills programs, or
            request a fee-support review if you are eligible.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={WOMENS_EMPOWERMENT_CONTENT.gatheringInterestPath}>
                Join an Upcoming Gathering
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/courses">
                Explore Skills Programs
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section
          id="fee-support"
          className="mx-auto mt-20 max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-8"
        >
          <h2 className="text-2xl font-bold">Need-Based Fee Support</h2>
          <p className="mt-3 text-muted-foreground">
            Limited fee support may be available for eligible women who cannot
            afford standard course fees. Each request is reviewed individually.
            Support depends on demonstrated need, eligibility, available seats,
            and resources. Submitting a request does not guarantee approval.
          </p>

          <ul className="mt-6 space-y-3">
            {WOMENS_EMPOWERMENT_CONTENT.feeSupportEligibility.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Card className="mt-8 bg-background">
            <CardHeader>
              <CardTitle>Request Fee-Support Review</CardTitle>
              <CardDescription>
                This pathway is separate from general paid admission. You will
                be asked for eligibility details and explicit consent before any
                information is shared for review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg">
                <Link href={FEE_SUPPORT_ADMISSION_PATH}>
                  Start Fee-Support Request
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Read how application information is handled in our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  privacy notice
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </article>
      <FooterSection />
    </>
  );
}
