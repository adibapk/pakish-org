import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  duration: string;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "1-Month Fast-Track",
    popular: 0,
    duration: "1 Month",
    description:
      "Basics of Freelancing, Canva, ChatGPT. Perfect for quick micro-tasking income.",
    buttonText: "Enroll Now",
    benefitList: [
      "Freelancing fundamentals",
      "Canva for digital design",
      "ChatGPT for productivity",
      "Micro-tasking income strategies",
      "WFH setup guidance",
    ],
  },
  {
    title: "3-Month Advanced",
    popular: 1,
    duration: "3 Months",
    description:
      "WordPress, SMM, Basic SEO, Prompt Engineering. Build a career as a remote digital marketer.",
    buttonText: "Enroll Now",
    benefitList: [
      "WordPress website building",
      "Social media marketing (SMM)",
      "Basic SEO techniques",
      "Prompt engineering",
      "Remote digital marketing career path",
    ],
  },
  {
    title: "6-Month Pro Developer",
    popular: 0,
    duration: "6 Months",
    description:
      "Next.js, Generative AI integration, Cursor Pro/Copilot Management. High-ticket global freelancing.",
    buttonText: "Enroll Now",
    benefitList: [
      "Next.js web development",
      "Generative AI integration",
      "Cursor Pro & Copilot management",
      "High-ticket freelancing strategies",
      "Portfolio & client acquisition",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="courses" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Courses
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Training Programs
      </h2>

      <h3 className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground pb-14">
        Free and subsidized courses designed to take you from beginner to
        professional — whether you want quick freelance income or a full
        development career.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, duration, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">{duration}</span>
                  <span className="text-muted-foreground"> program</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2 shrink-0" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  <Link href="#contact">{buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
