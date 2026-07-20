"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { uiAvatar } from "@/lib/avatar";
import { Star } from "lucide-react";

interface ReviewProps {
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    name: "Ayesha Khan",
    userName: "Fast-Track Graduate",
    comment:
      "The 1-month program gave me the confidence to start freelancing on Canva and ChatGPT. Within weeks I was earning from home while caring for my family.",
    rating: 5.0,
  },
  {
    name: "Fatima Zahra",
    userName: "Digital Marketing Student",
    comment:
      "The WordPress and SMM training opened doors I never thought possible. My mentors at Pakish.ORG treated me like family and guided me every step of the way.",
    rating: 4.8,
  },
  {
    name: "Sana Malik",
    userName: "Pro Developer Track",
    comment:
      "Learning Next.js and AI tools at Pakish.ORG transformed my career. I now work with international clients remotely thanks to the skills I gained here.",
    rating: 4.9,
  },
  {
    name: "Hira Abbas",
    userName: "Lodhran Campus Student",
    comment:
      "Having a dedicated workspace with internet in Lodhran made all the difference. The subsidized fees meant I could focus on learning instead of worrying about costs.",
    rating: 5.0,
  },
  {
    name: "Nadia Sheikh",
    userName: "Online via Zoom",
    comment:
      "I joined classes from home through Zoom and still received the same quality mentorship. Pakish.ORG truly makes tech education accessible to every woman in Pakistan.",
    rating: 5.0,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimonials
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Stories from Our Students
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pt-6 pb-0">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={uiAvatar(review.name, 128)}
                        alt={review.name}
                      />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
