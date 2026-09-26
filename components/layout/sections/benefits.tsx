import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Building2",
    title: "Backed by Pakish Group Since 1999",
    description:
      "Decades of software industry experience inform every curriculum, project, and mentor conversation.",
  },
  {
    icon: "Building2",
    title: "Supported Learning Environments",
    description:
      "Our Gulshan-e-Iqbal, Karachi campus offers equipped workspaces with internet, computers, and mentorship when cohorts are scheduled.",
  },
  {
    icon: "Users",
    title: "Family of Mentors",
    description:
      "Learn directly from the Pakish Group family — experienced professionals who have built software since 1999.",
  },
  {
    icon: "Laptop",
    title: "Career-Ready Delivery",
    description:
      "Programs are designed for practical skills — freelancing, development, AI productivity, and team upskilling.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-16 sm:py-24">
      <div className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="mb-2 text-lg tracking-wider text-primary">About</p>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Practical Training for Modern Tech Careers
          </h2>
          <p className="text-xl text-muted-foreground">
            Pakish Institute turns decades of software experience into
            instructor-led programs for students, professionals, freelancers,
            teams, and businesses across Pakistan.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card transition-all hover:bg-background hover:shadow-md"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl font-medium text-muted-foreground/15">
                    0{index + 1}
                  </span>
                </div>

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
