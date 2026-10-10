"use client";

import { useEffect } from "react";
import { AnimatedButton } from "@/components/motion/animated-button";
import { Container } from "@/components/shared/container";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[72vh] flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="eyebrow text-signal">Error</p>
      <h1 className="text-h2">Something went wrong.</h1>
      <p className="prose-width text-body-lg text-muted-foreground">
        A transient error hit the console. Try again, and if it keeps happening, head back home and reach out.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <AnimatedButton onClick={() => retry()} size="lg">
          Try again
        </AnimatedButton>
        <AnimatedButton href="/" variant="ghost" size="lg">
          Back home
        </AnimatedButton>
      </div>
      {error.digest && <p className="font-mono text-caption text-muted-foreground">Reference · {error.digest}</p>}
    </Container>
  );
}
