import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WOMENS_EMPOWERMENT_PATH } from "@/lib/womens-empowerment";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export const WomensEmpowermentPreviewSection = () => {
  return (
    <section id="initiatives" className="py-8">
      <hr className="border-secondary" />
      <div className="container py-14 sm:py-16">
        <Card className="mx-auto max-w-3xl border-primary/20 bg-muted/30 text-center">
          <CardHeader className="items-center">
            <span className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="size-6" aria-hidden="true" />
            </span>
            <CardTitle className="text-3xl md:text-4xl">
              Women&apos;s Empowerment Initiative
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground">
            Gatherings, skills workshops, mentorship, and limited need-based fee
            support for eligible women pursuing digital careers — separate from
            our commercial course catalogue.
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href={WOMENS_EMPOWERMENT_PATH}>
                Learn About the Initiative
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
