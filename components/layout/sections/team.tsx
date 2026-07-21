import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { uiAvatar } from "@/lib/avatar";
import Image from "next/image";

interface TeamProps {
  firstName: string;
  lastName: string;
  positions: string[];
}

export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      firstName: "Wasim",
      lastName: "Ullah",
      positions: ["Founder & Top-Level Tech Advisor"],
    },
    {
      firstName: "Razia",
      lastName: "Kausar",
      positions: ["Co Founder & Lead Organizer"],
    },
    {
      firstName: "Adiba",
      lastName: "Batool",
      positions: ["Freelancing Coach & Project Manager"],
    },
    {
      firstName: "Afifa",
      lastName: "Batool",
      positions: ["Freelancing Coach & Project Manager"],
    },
    {
      firstName: "Ilma",
      lastName: "Batool",
      positions: ["Design & Freelancing Coach"],
    },
    {
      firstName: "Qaseem",
      lastName: "Ullah",
      positions: ["Technical Support & Coordinator"],
    },
  ];

  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Team
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Our Core Family Mentors
        </h2>
        <p className="md:w-2/3 mx-auto text-xl text-center text-muted-foreground mt-4">
          A family-led team with decades of software industry experience,
          dedicated to guiding the next generation of women in tech.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamList.map(({ firstName, lastName, positions }, index) => {
          const fullName = `${firstName} ${lastName}`;

          return (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden"
            >
              <CardHeader className="p-0 gap-0">
                <div className="flex justify-center pt-8 pb-2">
                  <Image
                    src={uiAvatar(fullName)}
                    alt={fullName}
                    width={128}
                    height={128}
                    className="size-32 rounded-full object-cover ring-4 ring-primary/20"
                  />
                </div>
                <CardTitle className="py-4 pb-4 px-6 text-center">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, posIndex) => (
                <CardContent
                  key={posIndex}
                  className={`pb-0 text-muted-foreground text-center ${
                    posIndex === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                </CardContent>
              ))}
            </Card>
          );
        })}
      </div>
    </section>
  );
};
