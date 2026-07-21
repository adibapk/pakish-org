import { ArticleBody } from "@/components/insights/article-body";
import { ArticleJsonLd } from "@/components/insights/article-json-ld";
import { FooterSection } from "@/components/layout/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { InsightArticle } from "@/lib/insights/types";
import {
  categoryLabel,
  formatInsightDate,
  getRelatedInsights,
} from "@/lib/insights/utils";
import { ArrowLeft, Calendar, ExternalLink, User } from "lucide-react";
import Link from "next/link";

interface InsightArticlePageProps {
  article: InsightArticle;
}

export function InsightArticlePage({ article }: InsightArticlePageProps) {
  const related = getRelatedInsights(article.slug);

  return (
    <>
      <ArticleJsonLd article={article} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Button asChild variant="ghost" className="mb-8 -ml-2">
            <Link href="/insights">
              <ArrowLeft className="mr-2 size-4" />
              Back to Insights
            </Link>
          </Button>

          <header className="mb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">{categoryLabel(article.category)}</Badge>
              {article.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground md:text-xl">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatInsightDate(article.publishedAt)}
              </span>
            </div>

            <aside className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-base text-foreground md:text-lg">
              <p className="font-medium text-primary">Quick answer</p>
              <p className="mt-2 leading-relaxed">{article.directAnswer}</p>
            </aside>
          </header>

          <ArticleBody sections={article.sections} />

          {article.externalSources && article.externalSources.length > 0 && (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Sources
              </h2>
              <ul className="space-y-2">
                {article.externalSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      {source.title}
                      <ExternalLink className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.faq && article.faq.length > 0 && (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {article.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-12 rounded-2xl border border-secondary bg-card p-8 text-center">
            <h2 className="text-2xl font-bold">Ready to build your tech career?</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Join Pakish.ORG&apos;s free and subsidized IT &amp; AI training at
              our Karachi and Lodhran campuses or online via Zoom.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/#courses">Explore Courses</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl border-t border-border pt-16">
            <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
              Related insights
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((relatedArticle) => (
                <Card key={relatedArticle.slug} className="flex flex-col">
                  <CardHeader>
                    <Badge variant="outline" className="mb-2 w-fit text-xs">
                      {categoryLabel(relatedArticle.category)}
                    </Badge>
                    <CardTitle className="line-clamp-2 text-lg leading-snug">
                      <Link
                        href={`/insights/${relatedArticle.slug}`}
                        className="hover:text-primary"
                      >
                        {relatedArticle.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {relatedArticle.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Link
                      href={`/insights/${relatedArticle.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Read article →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <FooterSection />
      </div>
    </>
  );
}
