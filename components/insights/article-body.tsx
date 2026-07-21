import Link from "next/link";
import type { ReactNode } from "react";
import type { InsightBlock } from "@/lib/insights/types";

const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

function isExternalUrl(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function renderInlineContent(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const regex = new RegExp(LINK_REGEX.source, "g");

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const label = match[1];
    const href = match[2];

    if (isExternalUrl(href)) {
      parts.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {label}
        </a>
      );
    } else {
      parts.push(
        <Link
          key={key++}
          href={href}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {label}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

interface ArticleBodyProps {
  sections: InsightBlock[];
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <div className="insight-article-body space-y-6 text-lg leading-relaxed text-muted-foreground">
      {sections.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className="!mt-12 text-2xl font-bold tracking-tight text-foreground first:!mt-0 md:text-3xl"
              >
                {block.content}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="!mt-8 text-xl font-semibold text-foreground md:text-2xl"
              >
                {block.content}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="text-base md:text-lg">
                {renderInlineContent(block.content)}
              </p>
            );
          case "ul":
            return (
              <ul
                key={index}
                className="ml-6 list-disc space-y-2 text-base md:text-lg"
              >
                {block.items.map((item) => (
                  <li key={item}>{renderInlineContent(item)}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
