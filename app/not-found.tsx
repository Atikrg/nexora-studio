import type { Metadata } from "next";
import { AnimatedButton } from "@/components/motion/animated-button";
import { Container } from "@/components/shared/container";
import { LogoMark } from "@/components/shared/logo";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has moved or never existed.",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[72vh] flex-col items-center justify-center gap-6 py-32 text-center">
      <LogoMark className="size-14 text-foreground/25" />
      <p className="eyebrow text-signal">Error 404</p>
      <h1 className="text-h1">
        Lost in <em className="font-serif font-normal tracking-normal text-signal">orbit</em>.
      </h1>
      <p className="prose-width text-body-lg text-muted-foreground">
        The page you were looking for has moved or never existed. Let&rsquo;s get you back to mission control.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <AnimatedButton href="/" size="lg">
          Back home
        </AnimatedButton>
        <AnimatedButton href="/work/" variant="ghost" size="lg">
          See our work
        </AnimatedButton>
      </div>
    </Container>
  );
}
