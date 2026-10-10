import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types/content";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./project-visual";

export const categoryLabel = { web: "Website", app: "Mobile app", social: "Social media", automation: "Automation" } as const;

/** Case study card: mockup, category · industry, client, headline result. The whole card is one link. */
export function CaseStudyCard({ study, className, priority = false }: { study: CaseStudy; className?: string; priority?: boolean }) {
  const industry = industries.find((i) => i.slug === study.industry)?.name;
  const top = study.results[0]!;
  return (
    <article className={cn("group/cs relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card", className)}>
      <div className="relative aspect-4/3 overflow-hidden">
        <div className="size-full transition-transform duration-(--duration-slow) ease-out-expo group-hover/cs:scale-[1.04]">
          <ProjectVisual study={study} compact={!priority} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="eyebrow">
          {categoryLabel[study.category]} · {industry} · {study.timeline}
        </p>
        <h3 className="flex items-center justify-between gap-3 text-h3">
          <Link href={`/work/${study.slug}/`} data-cursor="View" className="after:absolute after:inset-0 hover:text-signal">
            {study.client}
          </Link>
          <ArrowUpRight aria-hidden="true" className="size-6 shrink-0 transition-transform duration-(--duration-base) group-hover/cs:translate-x-1 group-hover/cs:-translate-y-1" />
        </h3>
        <p className="text-small text-muted-foreground">{study.summary}</p>
        <p className="mt-auto border-t border-border pt-4 text-small">
          <span className="font-display text-h4">
            {top.prefix}
            {top.value.toLocaleString("en-IN")}
            {top.suffix}
          </span>{" "}
          <span className="text-muted-foreground">{top.label}</span>
        </p>
      </div>
    </article>
  );
}
