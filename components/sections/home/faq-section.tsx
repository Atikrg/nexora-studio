import { AnimatedButton } from "@/components/motion/animated-button";
import { FaqList } from "@/components/shared/faq-list";
import { Section } from "@/components/shared/section";
import { homeFaqs } from "@/data/home";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/links";
import type { Faq } from "@/types/content";

/** 15 · FAQ: mops up remaining objections (also emits FAQPage JSON-LD for search). */
export function FaqSection({
  number = 11,
  faqs = homeFaqs,
  title = "Questions founders ask us",
}: {
  number?: number;
  faqs?: Faq[];
  title?: string;
}) {
  return (
    <Section aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <p className="flex items-center gap-3 eyebrow">
            <span className="text-signal">[{String(number).padStart(2, "0")}]</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
            FAQ
          </p>
          <h2 id="faq-title" className="text-h1">
            {title}
          </h2>
          <p className="text-muted-foreground">
            Still unsure? Ask us directly. A real person replies within 24 hours.
          </p>
          <AnimatedButton
            href={whatsappUrl(defaultWhatsappMessage)}
            external
            arrow="external"
            variant="outline"
            className="w-fit"
          >
            Ask on WhatsApp
          </AnimatedButton>
        </div>
        <div className="lg:col-span-8">
          <FaqList faqs={faqs} />
        </div>
      </div>
    </Section>
  );
}
