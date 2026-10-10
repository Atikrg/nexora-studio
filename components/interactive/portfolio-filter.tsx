"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CaseStudyCard, categoryLabel } from "@/components/shared/case-study-card";
import type { CaseStudy } from "@/types/content";
import { spring } from "@/lib/motion";

type Filter = "all" | CaseStudy["category"];

/**
 * Portfolio grid with a category filter (shadcn ToggleGroup). Cards re-flow with Framer Motion
 * `layout` animations; the visible count is announced politely for screen readers.
 */
export function PortfolioFilter({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const categories = Array.from(new Set(studies.map((s) => s.category)));
  const visible = filter === "all" ? studies : studies.filter((s) => s.category === filter);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v as Filter)}
          aria-label="Filter case studies by service"
          className="flex-wrap justify-start gap-2"
        >
          {(["all", ...categories] as Filter[]).map((c) => (
            <ToggleGroupItem
              key={c}
              value={c}
              className="rounded-full border border-border px-5 data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background"
            >
              {c === "all" ? "All work" : categoryLabel[c]}
              <span className="ml-1.5 font-mono text-caption opacity-60">
                {c === "all" ? studies.length : studies.filter((s) => s.category === c).length}
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="eyebrow" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((study) => (
            <motion.li
              key={study.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={spring.layout}
            >
              <CaseStudyCard study={study} className="h-full" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
