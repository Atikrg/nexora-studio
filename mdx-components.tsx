import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Slug for heading anchors. */
function slugify(children: React.ReactNode): string {
  return String(Array.isArray(children) ? children.join("") : children)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Blog typography, mapped onto the design tokens. Readable measure (65ch), 1.7 line height,
 * accessible tables, external links open in a new tab with a screen-reader hint.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 id={slugify(children)} className="mt-16 mb-5 scroll-mt-28 text-h2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={slugify(children)} className="mt-10 mb-3 scroll-mt-28 text-h4">
        {children}
      </h3>
    ),
    p: (props) => <p className="my-5 text-body-lg leading-[1.75] text-foreground/85" {...props} />,
    ul: ({ className, ...props }: ComponentProps<"ul">) => (
      <ul className={cn("my-5 flex list-disc flex-col gap-2 pl-6 text-body-lg marker:text-signal", className)} {...props} />
    ),
    ol: (props) => <ol className="my-5 flex list-decimal flex-col gap-2 pl-6 text-body-lg marker:font-mono marker:text-signal" {...props} />,
    li: ({ className, ...props }: ComponentProps<"li">) => (
      <li className={cn("pl-1 leading-[1.7] text-foreground/85 [&.task-list-item]:list-none [&.task-list-item]:-ml-6", className)} {...props} />
    ),
    input: (props: ComponentProps<"input">) => <input {...props} className="mr-2 size-4 accent-[var(--primary)] align-middle" />,
    strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
    a: ({ href = "", children }) => {
      const external = /^https?:\/\//.test(href);
      const className = "font-medium text-foreground underline decoration-signal decoration-2 underline-offset-4 hover:text-signal";
      return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    },
    blockquote: (props) => <blockquote className="my-8 border-l-2 border-primary pl-6 font-display text-h4 text-foreground" {...props} />,
    hr: () => <hr className="my-12 border-border" />,
    em: (props) => <em className="text-muted-foreground" {...props} />,
    code: (props) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />,
    pre: (props) => <pre className="my-6 overflow-x-auto rounded-2xl border border-border bg-card p-5 font-mono text-small" {...props} />,
    table: (props) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-border" tabIndex={0}>
        <table className="w-full min-w-[32rem] text-left text-small" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-muted" {...props} />,
    th: (props) => <th scope="col" className="px-4 py-3 font-semibold" {...props} />,
    td: (props) => <td className="border-t border-border px-4 py-3 text-foreground/85" {...props} />,
    ...components,
  };
}
