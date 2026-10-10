import type { Metadata } from "next";
import { CalendarClock, Clock, Mail, MapPin } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { ContactForm } from "@/components/interactive/contact-form";
import { LocalTime } from "@/components/layout/local-time";
import { TrackedLink } from "@/components/layout/tracked-link";
import { WhatsAppIcon } from "@/components/layout/whatsapp-icon";
import { FounderAvatar } from "@/components/shared/founder-avatar";
import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { founder } from "@/data/founder";
import { primaryCta, site } from "@/data/site";
import { bookingUrl, defaultWhatsappMessage, mailtoUrl, whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact: Book a Free 15-min Strategy Call",
  description:
    "Book a free 15-minute strategy call, message us on WhatsApp or send your project details. Reply within 24 hours. Website development company in Pune, working worldwide.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

/** Contact: the calmest page. Booking first, WhatsApp second, form third. No motion over inputs. */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your launch."
        highlight="your launch"
        subtitle="Pick whatever's easiest. Every message is read by the founder, and you'll hear back within 24 hours."
        breadcrumbs={[{ label: "Contact", href: "/contact/" }]}
      />
      <Section aria-label="Ways to reach us" className="pt-0 md:pt-0">
        <div className="grid gap-8 lg:grid-cols-12">
          <aside className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex flex-col gap-5 rounded-3xl border border-primary/50 bg-primary/8 p-6 md:p-8">
              <CalendarClock aria-hidden="true" className="size-7 text-signal" />
              <div className="flex flex-col gap-2">
                <h2 className="text-h3">Fastest: book a call</h2>
                <p className="text-muted-foreground">15 minutes on Google Meet. Leave with a plan, a timeline and a price range.</p>
              </div>
              <AnimatedButton href={bookingUrl} external arrow="external" size="lg" className="w-full">
                {primaryCta.label}
              </AnimatedButton>
              <p className="text-caption text-muted-foreground">{primaryCta.microcopy}</p>
            </div>

            <ul className="flex flex-col divide-y divide-border rounded-3xl border border-border">
              <li>
                <TrackedLink
                  href={whatsappUrl(defaultWhatsappMessage)}
                  event="whatsapp_click"
                  location="contact_page"
                  external
                  className="flex min-h-16 items-center gap-4 p-5 transition-colors hover:bg-accent"
                >
                  <WhatsAppIcon className="size-6 text-success" />
                  <span className="flex flex-col">
                    <span className="font-medium">WhatsApp</span>
                    <span className="text-small text-muted-foreground">{site.contact.whatsappDisplay}</span>
                  </span>
                </TrackedLink>
              </li>
              <li>
                <a href={mailtoUrl("Project enquiry")} className="flex min-h-16 items-center gap-4 p-5 transition-colors hover:bg-accent">
                  <Mail aria-hidden="true" className="size-6 text-signal" />
                  <span className="flex flex-col">
                    <span className="font-medium">Email</span>
                    <span className="text-small text-muted-foreground">{site.contact.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 p-5">
                <MapPin aria-hidden="true" className="size-6 text-signal" />
                <span className="flex flex-col">
                  <span className="font-medium">
                    {site.location.city}, {site.location.region}
                  </span>
                  <span className="text-small text-muted-foreground">
                    Local time <LocalTime /> · Working with clients worldwide
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-4 p-5">
                <Clock aria-hidden="true" className="size-6 text-signal" />
                <span className="flex flex-col">
                  <span className="font-medium">{site.contact.responseTime}</span>
                  <span className="text-small text-muted-foreground">Monday to Saturday, IST</span>
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-4 rounded-3xl border border-border p-5">
              <FounderAvatar />
              <p className="text-small">
                <span className="font-medium">{founder.name}</span>
                <span className="block text-muted-foreground">&ldquo;{founder.intro}&rdquo;</span>
              </p>
            </div>
          </aside>

          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
