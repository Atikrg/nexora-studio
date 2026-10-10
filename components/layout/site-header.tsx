"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AnimatedButton } from "@/components/motion/animated-button";
import { MagneticWrapper } from "@/components/creative/magnetic-wrapper";
import { Icon } from "@/components/shared/icon";
import { Logo } from "@/components/shared/logo";
import { services } from "@/data/services";
import { mainNav, primaryCta } from "@/data/site";
import { bookingUrl } from "@/lib/links";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { RollLink } from "./roll-link";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
}

/**
 * Sticky header. Transparent at the top; after 24px it shrinks and gains a blurred glass
 * background. Desktop: NavigationMenu with a Services mega dropdown and a sliding active pill.
 * Mobile: logo + menu button (full-screen Sheet).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-(--duration-base)",
        scrolled && "border-border glass",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-4 transition-[height] duration-(--duration-base) ease-out-expo",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Logo />

        <NavigationMenu className="hidden lg:flex" aria-label="Main">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn("bg-transparent", servicesActive && "text-signal")}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(52rem,calc(100vw-4rem))] grid-cols-[1fr_15rem] gap-2 p-2">
                  <ul className="grid grid-cols-2 gap-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/services/${service.slug}/`}
                            className="group/item flex h-full flex-col items-start gap-3 rounded-xl p-4 hover:bg-accent"
                          >
                            <span className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-signal transition-colors group-hover/item:border-primary/40">
                              <Icon name={service.icon} className="size-5" />
                            </span>
                            <span className="flex flex-col gap-1">
                              <span className="flex items-center gap-1.5 font-display text-body font-semibold">
                                {service.name}
                                <ArrowRight
                                  aria-hidden="true"
                                  className="size-4 -translate-x-1 opacity-0 transition-all duration-(--duration-base) group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                />
                              </span>
                              <span className="text-small leading-snug text-muted-foreground">
                                {service.summary}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col justify-between gap-4 rounded-xl bg-muted p-5">
                    <div className="flex flex-col gap-2">
                      <Sparkles aria-hidden="true" className="size-5 text-signal" />
                      <p className="font-display text-body font-semibold">
                        Not sure what you need?
                      </p>
                      <p className="text-small text-muted-foreground">
                        Answer 3 quick questions and get a recommended package.
                      </p>
                    </div>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/services/#quiz"
                        className="inline-flex min-h-11 items-center gap-2 text-small font-semibold text-signal underline-offset-4 hover:underline"
                      >
                        Take the 2-min quiz <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/services/"
                        className="inline-flex min-h-11 items-center text-small font-medium text-muted-foreground hover:text-foreground"
                      >
                        All services →
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {mainNav.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <NavigationMenuItem key={link.href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={spring.layout}
                    />
                  )}
                  <NavigationMenuLink asChild active={active}>
                    <RollLink
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="relative hover:bg-transparent focus:bg-transparent data-active:bg-transparent"
                    >
                      {link.label}
                    </RollLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <MagneticWrapper className="hidden sm:inline-block" strength={0.2}>
            <AnimatedButton
              href={bookingUrl}
              external
              size="sm"
              arrow="external"
              data-track-location="header"
            >
              {primaryCta.shortLabel}
            </AnimatedButton>
          </MagneticWrapper>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
