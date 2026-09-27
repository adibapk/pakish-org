import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CreditCard, MessageSquare, UserCheck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: MessageSquare,
    title: "Apply & review",
    description:
      "Apply without an invitation. Staff confirms course, fee, and format before you pay.",
  },
  {
    icon: CreditCard,
    title: "Pay after confirmation",
    description:
      "Use listed payment methods only after fee instructions are confirmed, then share proof for review.",
  },
  {
    icon: UserCheck,
    title: "Enrollment & Academy access",
    description:
      "After verification, receive enrollment confirmation and invite-only Academy login access.",
  },
];

export const EnrollmentSection = () => {
  return (
    <section id="enrollment" className="container py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-lg tracking-wider text-primary">How It Works</p>
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          From Course Choice to Academy Access
        </h2>
        <p className="text-xl text-muted-foreground">
          A clear commercial enrollment path — choose your program, confirm fees,
          and begin instructor-led training.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, description }, index) => (
          <Card key={title}>
            <CardHeader>
              <div className="mb-3 flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </span>
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="text-base">{description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-secondary bg-card p-8 text-center">
        <h3 className="text-2xl font-bold">Ready to apply?</h3>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Apply without an invitation. Our team will contact you with course
          details, confirmed fees, and next steps. Academy access is issued after
          admission approval and enrollment.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/admission">
              Apply for Admission
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/payment-methods">View Payment Methods</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
