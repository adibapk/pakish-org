import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

/** @deprecated Use WomensEmpowermentPreviewSection on the homepage. */
export const CommunitySection = () => {
  return (
    <section id="community" className="py-8">
      <hr className="border-secondary" />
      <div className="container py-14 sm:py-16">
        <Card className="mx-auto max-w-3xl border-none bg-background text-center shadow-none">
          <CardHeader className="items-center">
            <Users className="mb-4 size-12 text-primary" />
            <CardTitle className="text-4xl font-bold md:text-5xl">
              Women&apos;s Empowerment Initiative
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xl text-muted-foreground">
            Gatherings, skills workshops, mentorship, and limited need-based fee
            support for eligible women — a separate Pakish Institute initiative.
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/womens-empowerment">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
