import Link from "next/link";
import { Check } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/shared/section";
import { AuditForm } from "@/components/interactive/audit-form";
import { leadMagnet } from "@/data/home";

/** 14 · Lead magnet: captures the not-yet-ready majority with a genuinely useful free audit. */
export function LeadMagnet({ number = 10 }: { number?: number }) {
  return (
    <Section id="audit" aria-labelledby="audit-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <p className="flex items-center gap-3 eyebrow">
            <span className="text-signal">[{String(number).padStart(2, "0")}]</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
            {leadMagnet.eyebrow}
          </p>
          <h2 id="audit-title" className="text-h1">
            {leadMagnet.title}
          </h2>
          <p className="prose-width text-body-lg text-muted-foreground">{leadMagnet.body}</p>
          <ul className="flex flex-col gap-3">
            {leadMagnet.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-signal">
                  <Check aria-hidden="true" className="size-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="text-small text-muted-foreground">
            {leadMagnet.secondary.split("?")[0]}?{" "}
            <Link
              href="/#calculator"
              className="font-medium text-foreground underline decoration-signal underline-offset-4"
            >
              {leadMagnet.secondary.split("? ")[1]}
            </Link>
          </p>
        </div>
        <FadeIn className="corner-marks rounded-3xl border border-border bg-card p-6 md:p-10 lg:col-span-6">
          <AuditForm source="home_lead_magnet" />
        </FadeIn>
      </div>
    </Section>
  );
}
