import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
}

export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Wasim",
      lastName: "Ullah",
      positions: ["Founder & Top-Level Tech Advisor"],
    },
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Razia",
      lastName: "Kausar",
      positions: ["Director & Lead Organizer"],
    },
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Adiba",
      lastName: "Batool",
      positions: ["Senior IT Mentor & Project Manager"],
    },
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Afifa",
      lastName: "Batool",
      positions: ["Generative AI Instructor"],
    },
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Ulma",
      lastName: "Batool",
      positions: ["Design & Freelancing Coach"],
    },
    {
      imageUrl: "/demo-img.jpg",
      firstName: "Qasim",
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
        {teamList.map(
          ({ imageUrl, firstName, lastName, positions }, index) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="py-6 pb-4 px-6">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, posIndex) => (
                <CardContent
                  key={posIndex}
                  className={`pb-0 text-muted-foreground ${
                    posIndex === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                </CardContent>
              ))}
            </Card>
          )
        )}
      </div>
    </section>
  );
};
