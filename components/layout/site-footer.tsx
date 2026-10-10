import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Mail } from "lucide-react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { MagneticWrapper } from "@/components/creative/magnetic-wrapper";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import { services } from "@/data/services";
import { footerNav, primaryCta, site } from "@/data/site";
import { bookingUrl, defaultWhatsappMessage, mailtoUrl, whatsappUrl } from "@/lib/links";
import { LocalTime } from "./local-time";
import { NewsletterForm } from "./newsletter-form";
import { TrackedLink } from "./tracked-link";
import { CookiePreferencesButton } from "./cookie-preferences-button";

/**
 * Footer: oversized CTA headline, link columns, contact, newsletter (UI only),
 * trust badges, live Pune time and legal links.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative overflow-hidden border-t border-border bg-background"
      aria-labelledby="footer-cta"
    >
      <div className="container-site pt-24 pb-10 md:pt-32">
        {/* Oversized CTA */}
        <div className="flex flex-col gap-10 border-b border-border pb-16 md:pb-24">
          <p className="flex items-center gap-3 eyebrow">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {site.availability}
          </p>
          <h2 id="footer-cta" className="text-display-xl">
            Let&rsquo;s build
            <br />
            <em className="font-serif font-normal tracking-normal text-signal">something.</em>
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticWrapper strength={0.2}>
              <AnimatedButton href={bookingUrl} external arrow="external" size="lg" variant="glow">
                {primaryCta.label}
              </AnimatedButton>
            </MagneticWrapper>
            <TrackedLink
              href={whatsappUrl(defaultWhatsappMessage)}
              event="whatsapp_click"
              location="footer"
              external
              className="inline-flex min-h-11 items-center gap-2 text-body font-medium underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal"
            >
              or message us on WhatsApp
            </TrackedLink>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-small text-muted-foreground">{site.positioning}</p>
            <NewsletterForm />
          </div>

          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className="mb-4 eyebrow">Services</h3>
            <ul className="flex flex-col">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}/`}
                    className="inline-flex min-h-11 items-center text-small text-muted-foreground transition-colors hover:text-foreground md:min-h-9"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h3 className="mb-4 eyebrow">Company</h3>
            <ul className="flex flex-col">
              {footerNav.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-small text-muted-foreground transition-colors hover:text-foreground md:min-h-9"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <div>
              <h3 className="mb-4 eyebrow">Contact</h3>
              <ul className="flex flex-col">
                <li>
                  <a
                    href={mailtoUrl()}
                    className="inline-flex min-h-11 items-center gap-2 text-small text-muted-foreground hover:text-foreground md:min-h-9"
                  >
                    <Mail aria-hidden="true" className="size-4" /> {site.contact.email}
                  </a>
                </li>
                <li>
                  <TrackedLink
                    href={whatsappUrl(defaultWhatsappMessage)}
                    event="whatsapp_click"
                    location="footer_contact"
                    external
                    className="inline-flex min-h-11 items-center text-small text-muted-foreground hover:text-foreground md:min-h-9"
                  >
                    WhatsApp {site.contact.whatsappDisplay}
                  </TrackedLink>
                </li>
                <li className="text-small text-muted-foreground">
                  {site.location.city}, {site.location.country} · <LocalTime />
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 eyebrow">Follow</h3>
              <ul className="flex flex-wrap gap-x-5">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 text-small text-muted-foreground hover:text-foreground"
                    >
                      {s.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <ul className="flex flex-wrap gap-3" aria-label="Business credentials">
          {site.trustBadges.map((b) => (
            <li
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-small"
              title={b.detail}
            >
              <BadgeCheck aria-hidden="true" className="size-4 text-signal" />
              {b.label}
            </li>
          ))}
        </ul>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-caption text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Made in {site.location.city}.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton />
              </li>
            </ul>
          </nav>
          <p className="font-mono uppercase">{site.location.coordinates}</p>
        </div>
      </div>
    </footer>
  );
}
