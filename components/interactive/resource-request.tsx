"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { AnimatedButton, type ButtonStatus } from "@/components/motion/animated-button";
import { TextField } from "@/components/shared/form-fields";
import type { Resource } from "@/types/content";
import { track } from "@/lib/analytics";
import { submitLead } from "@/lib/submit";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.email("Enter a valid email, like you@startup.com"),
});
type Values = z.infer<typeof schema>;

/**
 * "Get it free" for a resource (UI-only lead magnet). Opens a small Dialog; the request goes
 * through lib/submit.ts. Replace with real file delivery when a backend exists.
 */
export function ResourceRequest({ resource }: { resource: Pick<Resource, "slug" | "title" | "format"> }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "" }, mode: "onTouched" });

  async function onSubmit(values: Values) {
    setStatus("loading");
    const res = await submitLead({ kind: "resource", name: values.name, email: values.email, fields: { Resource: resource.title } });
    if (res.ok) {
      setStatus("success");
      track("resource_request", { resource: resource.slug });
      toast.success("Request ready", { description: "Send the pre-filled message and we'll reply with your copy." });
      window.setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        form.reset();
      }, 1200);
    } else {
      setStatus("error");
      toast.error(res.error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) track("lead_magnet_open", { resource: resource.slug });
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Download aria-hidden="true" /> Get it free
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" data-lenis-prevent>
        <DialogHeader>
          <DialogTitle className="text-h4">{resource.title}</DialogTitle>
          <DialogDescription>{resource.format}. Tell us where to send it.</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit, () => setShakeKey((k) => k + 1))}
          className="flex flex-col gap-5"
        >
          <FieldGroup className="gap-4">
            <TextField control={form.control} name="name" label="Your name" autoComplete="name" required shakeKey={shakeKey} />
            <TextField control={form.control} name="email" label="Email" type="email" inputMode="email" autoComplete="email" required shakeKey={shakeKey} />
          </FieldGroup>
          <AnimatedButton type="submit" status={status} className="w-full" successText="Opening WhatsApp…">
            Send me the {resource.title.split(" ").slice(-2).join(" ").toLowerCase()}
          </AnimatedButton>
          <p className="text-caption text-muted-foreground">No spam. One follow-up at most, and only if it&rsquo;s useful.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
