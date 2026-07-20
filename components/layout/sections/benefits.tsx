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
    icon: "Heart",
    title: "Fi Sabilillah Initiative",
    description:
      "A non-profit, family-led mission to uplift women and youth through accessible technology education.",
  },
  {
    icon: "Building2",
    title: "Dedicated Workspaces",
    description:
      "Fully equipped campuses in Karachi and Lodhran with internet, computers, and a supportive learning environment.",
  },
  {
    icon: "Users",
    title: "Family of Mentors",
    description:
      "Learn directly from the Pakish Group family — experienced professionals who have built software since 1999.",
  },
  {
    icon: "Laptop",
    title: "Work-From-Home Ready",
    description:
      "Every program is designed to help you earn remotely through freelancing, digital marketing, or development.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">About</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Mission (Fi Sabilillah Initiative)
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We are transforming a 25-year software house legacy into a community
            empowerment project. We offer dedicated workspaces, internet, and
            mentorship to bridge the tech gender gap in Pakistan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
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
