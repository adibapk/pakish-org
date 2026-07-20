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
    title: "Free & Subsidized Programs",
    description:
      "Quality IT and AI training accessible to women and youth who need financial support to start their tech journey.",
  },
  {
    icon: "MapPin",
    title: "Karachi & Lodhran Campuses",
    description:
      "On-site learning at our fully equipped campuses with mentors, workspace, and high-speed internet.",
  },
  {
    icon: "Video",
    title: "Online via Zoom",
    description:
      "Cannot attend in person? Join live classes remotely and learn from anywhere in Pakistan.",
  },
  {
    icon: "Bot",
    title: "Generative AI Focus",
    description:
      "Master ChatGPT, prompt engineering, and AI-powered tools that are reshaping the global freelance market.",
  },
  {
    icon: "Globe",
    title: "Global Freelancing",
    description:
      "From Canva micro-tasks to Next.js development — programs tailored for international remote income.",
  },
  {
    icon: "Shield",
    title: "25-Year Legacy",
    description:
      "Backed by Pakish Group, a software house established in 1999 with decades of real-world industry experience.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Why Pakish.ORG
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Built for Women Entering Tech
      </h2>

      <h3 className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground mb-8">
        A family-led initiative combining decades of software expertise with a
        mission to close Pakistan&apos;s tech gender gap through practical,
        career-ready training.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
