"use client";

import { useId, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter-style signup. UI ONLY: nothing is sent anywhere yet.
 * Connect a provider (Buttondown, ConvertKit, Brevo) inside `subscribe()`.
 */
async function subscribe(email: string): Promise<void> {
  // DUMMY: replace before launch (connect an email provider)
  await new Promise((r) => setTimeout(r, 600));
  void email;
}

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setError("Enter a valid email, like you@startup.com");
      return;
    }
    setError(null);
    setStatus("loading");
    await subscribe(email);
    setStatus("done");
    setEmail("");
    track("newsletter_submit");
    toast.success("You're on the list", { description: "One useful launch tip a month. No spam." });
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-sm flex-col gap-2">
      <label htmlFor={`${id}-email`} className="text-small font-medium">
        Monthly launch notes for founders
      </label>
      <div className="flex gap-2">
        <Input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@startup.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          className={cn(error && "animate-shake")}
        />
        <Button type="submit" size="icon-lg" loading={status === "loading"} aria-label="Subscribe">
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-small text-destructive">
          {error}
        </p>
      ) : (
        <p id={`${id}-hint`} className="text-caption text-muted-foreground">
          One email a month. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
