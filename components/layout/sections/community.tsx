import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <Heart className="size-12 text-primary mb-4" />
                <div>
                  Support Our
                  <span className="text-transparent pl-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
                    Cause
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Pakish.ORG is a non-profit initiative. Your donations and
              sponsorships help us provide free workspaces, internet, and
              subsidized training to women and youth across Pakistan.
            </CardContent>

            <CardFooter>
              <Button asChild>
                <Link href="#contact">Get Involved</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
