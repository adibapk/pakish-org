import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "GraduationCap",
    title: "Project-Based Learning",
    description:
      "Structured programs with live instruction, practical assignments, and portfolio-ready work — not theory-only slides.",
  },
  {
    icon: "MapPin",
    title: "Karachi Campus",
    description:
      "On-site learning at Gulshan-e-Iqbal, Karachi when cohorts are scheduled, with mentor support and equipped workspaces.",
  },
  {
    icon: "Video",
    title: "Live Online Training",
    description:
      "Join instructor-led Google Meet sessions from anywhere in Pakistan — one-to-one, group, or team formats.",
  },
  {
    icon: "Bot",
    title: "AI & Modern Tools",
    description:
      "Train with current Generative AI, web, cloud, and productivity tools used in real workplaces and freelance delivery.",
  },
  {
    icon: "Globe",
    title: "Career-Ready Skills",
    description:
      "From AI productivity to full-stack development and freelancing — skills aligned to today's digital economy.",
  },
  {
    icon: "Shield",
    title: "Backed by Experience Since 1999",
    description:
      "Pakish Institute is backed by Pakish Group, a software house established in 1999 with decades of industry experience.",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full border-t border-border/40 bg-background py-16 sm:py-24"
    >
      <div className="container">
        <p className="mb-2 text-center text-lg tracking-wider text-primary">
          Why Pakish Institute
        </p>

        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Practical Training for Modern Tech Careers
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-center text-xl text-muted-foreground">
          Instructor-led programs for students, professionals, freelancers,
          teams, and businesses — with clear fees and multiple delivery formats.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map(({ icon, title, description }) => (
            <div key={title}>
              <Card className="h-full border-0 bg-background shadow-none transition-shadow hover:shadow-md">
                <CardHeader className="flex items-center justify-center">
                  <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
                    <Icon
                      name={icon as keyof typeof icons}
                      size={24}
                      color="hsl(var(--primary))"
                      className="text-primary"
                    />
                  </div>

                  <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="text-center text-muted-foreground">
                  {description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
