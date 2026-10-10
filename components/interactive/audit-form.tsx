"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FieldGroup } from "@/components/ui/field";
import { AnimatedButton, type ButtonStatus } from "@/components/motion/animated-button";
import { TextAreaField, TextField } from "@/components/shared/form-fields";
import { track } from "@/lib/analytics";
import { submitLead, type LeadKind } from "@/lib/submit";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.email("Enter a valid email, like you@startup.com"),
  link: z
    .string()
    .trim()
    .min(4, "Paste your website or app link, or describe your idea in a sentence")
    .max(500, "Keep it under 500 characters"),
});

type AuditValues = z.infer<typeof schema>;

/**
 * Free Startup Launch Audit request. Used inline on the home page and in the exit-intent
 * Dialog/Drawer. Submits through lib/submit.ts (WhatsApp, with email fallback).
 */
export function AuditForm({
  source,
  kind = "audit",
  onSuccess,
}: {
  source: string;
  kind?: LeadKind;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const form = useForm<AuditValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", link: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: AuditValues) {
    setStatus("loading");
    const res = await submitLead({
      kind,
      name: values.name,
      email: values.email,
      fields: { "Website / app / idea": values.link, Source: source },
    });
    if (res.ok) {
      setStatus("success");
      track("lead_magnet_open", { source, step: "submitted" });
      toast.success("Request ready to send", {
        description:
          res.channel === "whatsapp"
            ? "Hit send in WhatsApp and we'll reply within 24 hours."
            : "Send the email and we'll reply within 24 hours.",
      });
      form.reset();
      onSuccess?.();
    } else {
      setStatus("error");
      toast.error(res.error);
    }
    window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit, () => {
        setShakeKey((k) => k + 1);
        setStatus("error");
        window.setTimeout(() => setStatus("idle"), 1200);
      })}
      className="flex flex-col gap-5"
    >
      <FieldGroup className="gap-4">
        <TextField
          control={form.control}
          name="name"
          label="Your name"
          autoComplete="name"
          required
          shakeKey={shakeKey}
        />
        <TextField
          control={form.control}
          name="email"
          label="Work email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          shakeKey={shakeKey}
        />
        <TextAreaField
          control={form.control}
          name="link"
          label="Website, app link or idea"
          inputClassName="min-h-24"
          required
          shakeKey={shakeKey}
        />
      </FieldGroup>
      <AnimatedButton
        type="submit"
        status={status}
        size="lg"
        className="w-full"
        successText="Opening WhatsApp…"
        errorText="Check the fields above"
      >
        Get my free audit
      </AnimatedButton>
    </form>
  );
}
