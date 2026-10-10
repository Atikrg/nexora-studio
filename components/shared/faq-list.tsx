import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/types/content";
import { JsonLd } from "./json-ld";

/** FAQ accordion (shadcn/Radix: keyboard + aria built in) with optional FAQPage JSON-LD. */
export function FaqList({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  return (
    <>
      <Accordion type="single" collapsible className="border-t border-border">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`faq-${i}`} className="border-b border-border">
            <AccordionTrigger className="min-h-16 py-5 text-left font-display text-h4 hover:text-signal hover:no-underline [&>svg]:size-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="prose-width pb-6 text-body text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}
