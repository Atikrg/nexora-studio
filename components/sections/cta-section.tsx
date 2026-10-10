import { AnimatedButton } from "@/components/motion/animated-button";
import { MagneticWrapper } from "@/components/creative/magnetic-wrapper";
import { FadeIn } from "@/components/motion/fade-in";
import { Container } from "@/components/shared/container";
import { FounderAvatar, FounderPreview } from "@/components/shared/founder-avatar";
import { founder } from "@/data/founder";
import { finalCta } from "@/data/home";
import { primaryCta, site } from "@/data/site";
import { bookingUrl, defaultWhatsappMessage, whatsappUrl } from "@/lib/links";

type CtaSectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  id?: string;
};

/**
 * Closing CTA used at the end of every page: one primary action (book a call), a WhatsApp
 * alternative, the founder's face ("you'll work directly with me") and the scarcity line.
 */
export function CtaSection({
  eyebrow = finalCta.eyebrow,
  title = finalCta.title,
  body = finalCta.body,
  id = "final-cta",
}: CtaSectionProps) {
  return (
    <section aria-labelledby={id} className="section-y">
      <Container>
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-16">
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-40 size-[28rem] rounded-full bg-primary opacity-20 blur-3xl"
          />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-6 lg:col-span-8">
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={id} className="text-display">
                {title}
              </h2>
              <p className="prose-width text-body-lg text-muted-foreground">{body}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticWrapper strength={0.15}>
                  <AnimatedButton
                    href={bookingUrl}
                    external
                    arrow="external"
                    size="lg"
                    variant="glow"
                    className="w-full sm:w-auto"
                  >
                    {primaryCta.label}
                  </AnimatedButton>
                </MagneticWrapper>
                <AnimatedButton
                  href={whatsappUrl(defaultWhatsappMessage)}
                  external
                  arrow="external"
                  size="lg"
                  variant="ghost"
                >
                  WhatsApp us
                </AnimatedButton>
              </div>
              <p className="text-small text-muted-foreground">{primaryCta.microcopy}</p>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background/60 p-6 lg:col-span-4">
              <div className="flex items-center gap-4">
                <FounderAvatar />
                <div className="flex flex-col">
                  <FounderPreview />
                  <span className="text-small text-muted-foreground">{founder.role}</span>
                </div>
              </div>
              <p className="text-body">&ldquo;{founder.intro}&rdquo;</p>
              <p className="flex items-center gap-2 eyebrow">
                <span className="size-2 rounded-full bg-success" aria-hidden="true" />
                {site.availability}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
