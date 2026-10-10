import { ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/shared/container";
import { guarantee } from "@/data/home";

/** 13 · Guarantee: removes risk right where price creates hesitation. Inverse tone for contrast. */
export function Guarantee({ number = 9 }: { number?: number }) {
  return (
    <section aria-labelledby="guarantee-title" className="section-y">
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-16">
          <ShieldCheck
            aria-hidden="true"
            strokeWidth={1}
            className="absolute -right-10 -bottom-10 size-72 opacity-15 md:size-96"
          />
          <div className="relative flex max-w-4xl flex-col gap-8">
            <p className="flex items-center gap-3 font-mono text-caption tracking-[0.08em] uppercase">
              <span>[{String(number).padStart(2, "0")}]</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
              {guarantee.eyebrow}
            </p>
            <h2 id="guarantee-title" className="text-display">
              {guarantee.title}
            </h2>
            <p className="prose-width text-body-lg">{guarantee.body}</p>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {guarantee.points.map((p) => (
                <li key={p} className="flex items-center gap-2 font-medium">
                  <ShieldCheck aria-hidden="true" className="size-5" /> {p}
                </li>
              ))}
            </ul>
            <p className="max-w-2xl text-small opacity-80">* {guarantee.fineprint}</p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
