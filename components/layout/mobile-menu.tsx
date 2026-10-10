"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatedButton } from "@/components/motion/animated-button";
import { Logo } from "@/components/shared/logo";
import { services } from "@/data/services";
import { mainNav, primaryCta, site } from "@/data/site";
import { bookingUrl, defaultWhatsappMessage, mailtoUrl, whatsappUrl } from "@/lib/links";
import { ease, stagger } from "@/lib/motion";
import { ThemeToggle } from "./theme-toggle";
import { WhatsAppIcon } from "./whatsapp-icon";

const links = [
  { label: "Services", href: "/services/" },
  ...mainNav,
  { label: "Contact", href: "/contact/" },
];

/**
 * Full-screen mobile menu (shadcn Sheet → Radix Dialog: focus trap, Esc, focus return).
 * Links stagger in from below. Closes on navigation.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  // Close when the route changes (adjusting state during render, no effect needed)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="h-svh gap-0 overflow-y-auto border-none bg-background p-0 data-[side=top]:h-svh"
      >
        <div className="container-site flex h-16 shrink-0 items-center">
          <Logo />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>

        <nav aria-label="Mobile" className="container-site flex flex-1 flex-col pt-6">
          <motion.ul
            className="flex flex-col"
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: stagger.base, delayChildren: 0.1 } },
            }}
          >
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                className="overflow-hidden border-b border-border"
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: ease.outExpo } },
                }}
              >
                <Link
                  href={link.href}
                  aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                  className="flex min-h-16 items-baseline justify-between py-3 font-display text-h2 aria-[current=page]:text-signal"
                >
                  {link.label}
                  <span className="font-mono text-caption text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <ul className="mt-6 grid grid-cols-2 gap-x-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="flex min-h-11 items-center text-small text-muted-foreground hover:text-foreground"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-8 pb-8">
            <AnimatedButton
              href={bookingUrl}
              external
              size="lg"
              arrow="external"
              className="w-full"
              data-track-location="mobile_menu"
            >
              {primaryCta.label}
            </AnimatedButton>
            <Button asChild variant="outline" size="lg" className="w-full">
              <a
                href={whatsappUrl(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="mobile_menu"
              >
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <a
                href={mailtoUrl()}
                className="inline-flex min-h-11 items-center gap-2 text-small text-muted-foreground hover:text-foreground"
              >
                <Mail aria-hidden="true" className="size-4" /> {site.contact.email}
              </a>
              <ThemeToggle />
            </div>
            <ul className="flex flex-wrap gap-x-4">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 text-small text-muted-foreground hover:text-foreground"
                  >
                    {s.label} <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
