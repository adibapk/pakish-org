import { FooterSection } from "@/components/layout/sections/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categoryLabel,
  formatInsightDate,
  getAllInsights,
} from "@/lib/insights/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";

export function InsightsIndexContent() {
  const articles = getAllInsights();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-3xl py-12 text-center md:py-20">
        <Badge variant="outline" className="mb-4 py-2 text-sm">
          Research &amp; Stories
        </Badge>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Pakish.ORG Insights
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          Achievement stories, practical guides, and research on women in tech,
          freelancing, and generative AI across Pakistan.
        </p>
      </section>

      <section className="mx-auto max-w-5xl pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.slug} className="flex flex-col">
              <CardHeader>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {categoryLabel(article.category)}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {formatInsightDate(article.publishedAt)}
                  </span>
                </div>
                <CardTitle className="text-xl leading-snug">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="hover:text-primary"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 text-base">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link
                  href={`/insights/${article.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read insight →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
