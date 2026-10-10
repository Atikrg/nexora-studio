import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/data/site";
import { JsonLd } from "./json-ld";

export type Crumb = { label: string; href: string };

/** Breadcrumb trail with BreadcrumbList JSON-LD. The current page is the last crumb. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="eyebrow flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-foreground">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-foreground md:min-h-0">
                    {c.label}
                  </Link>
                )}
                {!last && <ChevronRight aria-hidden="true" className="size-3" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: new URL(c.href, site.url).toString(),
          })),
        }}
      />
    </>
  );
}
