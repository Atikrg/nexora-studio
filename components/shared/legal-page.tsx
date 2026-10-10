import type { ReactNode } from "react";
import { Scale } from "lucide-react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";

type LegalPageProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Human-readable date, e.g. "10 October 2026". */
  updated: string;
  breadcrumbs: Crumb[];
  children: ReactNode;
};

/** Shared shell for the legal pages: hero, review notice, and readable long-form typography. */
export function LegalPage({ eyebrow = "Legal", title, subtitle, updated, breadcrumbs, children }: LegalPageProps) {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
        <div
          aria-hidden="true"
          className="absolute -top-40 right-[-10%] -z-10 size-[36rem] rounded-full bg-primary opacity-[0.12] blur-3xl"
        />
        <Container className="flex flex-col gap-6">
          <Breadcrumbs items={breadcrumbs} />
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            {eyebrow}
          </p>
          <h1 className="text-h1">{title}</h1>
          {subtitle && <p className="prose-width text-body-lg text-muted-foreground">{subtitle}</p>}
          <p className="font-mono text-caption tracking-[0.08em] text-muted-foreground">LAST UPDATED · {updated}</p>
        </Container>
      </section>

      <Container className="pb-24 md:pb-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex items-start gap-4 rounded-2xl border border-primary/40 bg-primary/8 p-5 md:p-6">
            <Scale aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-signal" />
            <p className="text-small text-muted-foreground">
              <span className="font-medium text-foreground">Template notice.</span> This document is a starting point,
              not legal advice. Have a qualified lawyer review and adapt it to your jurisdiction, your contracts and how
              the business actually operates before launch.
            </p>
          </div>
          <div className="flex flex-col gap-10 text-body-lg leading-[1.75] text-foreground/85 [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-signal [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:text-signal [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6 [&_ul]:marker:text-signal">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
}

type LegalSectionProps = {
  /** Section number rendered as "01". */
  n: string;
  id: string;
  title: string;
  children: ReactNode;
};

/** A numbered legal clause with an anchor id and a "back to top" affordance. */
export function LegalSection({ n, id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="flex scroll-mt-28 flex-col gap-4">
      <h2 className="flex items-baseline gap-3 text-h4">
        <span aria-hidden="true" className="font-mono text-caption text-signal">
          {n}
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
