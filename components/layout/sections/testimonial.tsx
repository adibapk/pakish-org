import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Code2, MessageSquareText } from "lucide-react";

const proofPoints = [
  {
    icon: Code2,
    title: "Build visible work",
    description:
      "Each path focuses on practical samples or deployed projects that a learner can show, explain, and improve.",
  },
  {
    icon: MessageSquareText,
    title: "Practice client communication",
    description:
      "Learners practice discovery questions, project scope, proposals, progress updates, and safer payment habits.",
  },
  {
    icon: ClipboardCheck,
    title: "Leave with a next-step plan",
    description:
      "Mentor feedback helps learners identify skill gaps and choose realistic portfolio, internship, job, or freelance next steps.",
  },
];

export const TestimonialSection = () => {
  return (
    <section id="proof" className="w-full bg-muted/30 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-lg tracking-wider text-primary">
            Proof, Not Promises
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Training Designed Around Work You Can Show
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pakish.ORG does not guarantee jobs, clients, or a fixed income.
            The goal is to help every committed learner build stronger skills,
            credible work, and a clearer route into Pakistan&apos;s digital economy.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {proofPoints.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="bg-background">
              <CardHeader>
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
