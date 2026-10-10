import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { SavingsCalculator } from "@/components/interactive/savings-calculator";

/** 10 · Interactive: personalises the value of automation (strongest for the SMB persona). */
export function CalculatorSection({ number = 6 }: { number?: number }) {
  return (
    <Section id="calculator" aria-labelledby="calculator-title" tone="muted">
      <SectionHeading
        number={number}
        eyebrow="Automation savings calculator"
        id="calculator-title"
        title={
          <>
            How many hours is manual work <em>costing</em> you?
          </>
        }
        subtitle="Move the sliders. See what automating your repetitive tasks could give back every month."
      />
      <FadeIn>
        <SavingsCalculator />
      </FadeIn>
    </Section>
  );
}
