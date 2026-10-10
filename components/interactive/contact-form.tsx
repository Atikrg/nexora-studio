"use client";

import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AnimatedButton, type ButtonStatus } from "@/components/motion/animated-button";
import { TextAreaField, TextField } from "@/components/shared/form-fields";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { takeContactPrefill } from "@/lib/prefill";
import { submitLead } from "@/lib/submit";
import { cn } from "@/lib/utils";

const budgets = ["Under ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹4L", "₹4L+", "Not sure yet"] as const;
const timelines = ["ASAP (within 2 weeks)", "Within a month", "1–3 months", "Just exploring"] as const;
const serviceOptions = [...services.map((s) => ({ value: s.slug, label: s.name })), { value: "not-sure", label: "Not sure yet" }];

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.email("Enter a valid email, like you@startup.com"),
  phone: z
    .string()
    .trim()
    .regex(/^$|^[+()\d\s-]{8,20}$/, "Enter a valid phone number, or leave it empty")
    .optional(),
  company: z.string().trim().max(80).optional(),
  service: z.string().min(1, "Choose a service, or 'Not sure yet'"),
  budget: z.enum(budgets, { error: "Pick a budget range, or 'Not sure yet'" }),
  timeline: z.string().min(1, "Choose a timeline"),
  message: z.string().trim().min(20, "A couple of sentences helps us prepare (20+ characters)").max(2000),
  nda: z.boolean(),
});

type ContactValues = z.infer<typeof schema>;

/**
 * Contact form (React Hook Form + Zod through shadcn Field). Client-side validation only;
 * submit goes through lib/submit.ts (WhatsApp with email fallback) until a backend is connected.
 * Pre-fills from the quiz or a pricing card via sessionStorage (lib/prefill.ts).
 */
export function ContactForm() {
  const id = useId();
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const [shakeKey, setShakeKey] = useState(0);
  const [sent, setSent] = useState(false);
  const [prefilledPackage, setPrefilledPackage] = useState<string | null>(null);

  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", timeline: "", message: "", nda: false },
    mode: "onTouched",
  });

  useEffect(() => {
    const prefill = takeContactPrefill();
    if (!prefill) return;
    // reset() (not setValue) so every controlled field, including the Radix Select, re-renders
    form.reset({
      ...form.getValues(),
      service: prefill.service ?? "",
      message: prefill.package
        ? `I'm interested in the ${prefill.package} package.${prefill.message ? `\n\nMy quiz answers:\n${prefill.message}` : ""}\n\nAbout my project: `
        : (prefill.message ?? ""),
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from sessionStorage
    if (prefill.package) setPrefilledPackage(prefill.package);
  }, [form]);

  async function onSubmit(values: ContactValues) {
    setStatus("loading");
    const serviceLabel = serviceOptions.find((s) => s.value === values.service)?.label;
    const res = await submitLead({
      kind: "contact",
      name: values.name,
      email: values.email,
      phone: values.phone,
      company: values.company,
      fields: {
        Service: serviceLabel,
        Package: prefilledPackage ?? undefined,
        Budget: values.budget,
        Timeline: values.timeline,
        "NDA requested": values.nda ? "Yes" : undefined,
      },
      message: values.message,
    });
    if (res.ok) {
      setStatus("success");
      setSent(true);
      toast.success("Almost there", {
        description: res.channel === "whatsapp" ? "Press send in WhatsApp. We reply within 24 hours." : "Send the email. We reply within 24 hours.",
      });
    } else {
      setStatus("error");
      toast.error(res.error);
      window.setTimeout(() => setStatus("idle"), 2500);
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-start gap-5 py-6"
        role="status"
      >
        <CheckCircle2 aria-hidden="true" className="size-12 text-success" />
        <h2 className="text-h3">Thanks! Your message is ready.</h2>
        <p className="text-muted-foreground">
          We opened WhatsApp (or your email app) with everything pre-filled. Just press send. If nothing opened, email us at{" "}
          <a href={`mailto:${site.contact.email}`} className="font-medium text-foreground underline underline-offset-4">
            {site.contact.email}
          </a>
          .
        </p>
        <Button variant="outline" onClick={() => { setSent(false); setStatus("idle"); form.reset(); }}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      aria-labelledby={`${id}-title`}
      onSubmit={form.handleSubmit(onSubmit, () => {
        setShakeKey((k) => k + 1);
        setStatus("error");
        window.setTimeout(() => setStatus("idle"), 1200);
        // Move focus to the first invalid field
        window.setTimeout(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 50);
      })}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <h2 id={`${id}-title`} className="text-h3">
          Tell us about your project
        </h2>
        <p className="text-small text-muted-foreground">
          Fields marked <span className="text-signal">*</span> are required. We reply within 24 hours.
          {prefilledPackage && (
            <span className="mt-2 block font-medium text-foreground">Selected package: {prefilledPackage}</span>
          )}
        </p>
      </div>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <TextField control={form.control} name="name" label="Your name" autoComplete="name" required shakeKey={shakeKey} />
        <TextField control={form.control} name="email" label="Email" type="email" inputMode="email" autoComplete="email" required shakeKey={shakeKey} />
        <TextField control={form.control} name="phone" label="WhatsApp / phone (optional)" type="tel" inputMode="tel" autoComplete="tel" shakeKey={shakeKey} />
        <TextField control={form.control} name="company" label="Company or project (optional)" autoComplete="organization" shakeKey={shakeKey} />
      </FieldGroup>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          control={form.control}
          name="service"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined} className={cn(fieldState.invalid && "animate-shake")} key={fieldState.invalid ? `s${shakeKey}` : "s"}>
              <FieldLabel htmlFor={`${id}-service`}>
                Service <span aria-hidden="true" className="text-signal">*</span>
              </FieldLabel>
              {/* Ignore the empty change Radix emits when the value is set programmatically (prefill/reset) */}
              <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                <SelectTrigger
                  id={`${id}-service`}
                  className="w-full"
                  aria-invalid={fieldState.invalid || undefined}
                  aria-required
                  aria-describedby={fieldState.error ? `${id}-service-error` : undefined}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value} className="min-h-11">
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id={`${id}-service-error`} errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="timeline"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined} className={cn(fieldState.invalid && "animate-shake")} key={fieldState.invalid ? `t${shakeKey}` : "t"}>
              <FieldLabel htmlFor={`${id}-timeline`}>
                When do you need it? <span aria-hidden="true" className="text-signal">*</span>
              </FieldLabel>
              {/* Ignore the empty change Radix emits when the value is set programmatically (prefill/reset) */}
              <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                <SelectTrigger
                  id={`${id}-timeline`}
                  className="w-full"
                  aria-invalid={fieldState.invalid || undefined}
                  aria-required
                  aria-describedby={fieldState.error ? `${id}-timeline-error` : undefined}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Choose a timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((t) => (
                    <SelectItem key={t} value={t} className="min-h-11">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError id={`${id}-timeline-error`} errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Controller
        control={form.control}
        name="budget"
        render={({ field, fieldState }) => (
          <FieldSet
            data-invalid={fieldState.invalid || undefined}
            aria-describedby={fieldState.error ? `${id}-budget-error` : undefined}
            className={cn(fieldState.invalid && "animate-shake")}
            key={fieldState.invalid ? `b${shakeKey}` : "b"}
          >
            <FieldLegend variant="label">
              Budget range <span aria-hidden="true" className="text-signal">*</span>
            </FieldLegend>
            <RadioGroup value={field.value ?? ""} onValueChange={field.onChange} aria-required aria-invalid={fieldState.invalid || undefined} className="flex flex-wrap gap-2">
              {budgets.map((b) => {
                const optionId = `${id}-budget-${b}`;
                return (
                  <label
                    key={b}
                    htmlFor={optionId}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-4 text-small transition-colors",
                      field.value === b ? "border-primary bg-primary/8" : "border-border hover:border-foreground/40",
                    )}
                  >
                    <RadioGroupItem id={optionId} value={b} />
                    {b}
                  </label>
                );
              })}
            </RadioGroup>
            <FieldError id={`${id}-budget-error`} errors={[fieldState.error]} />
          </FieldSet>
        )}
      />

      <TextAreaField control={form.control} name="message" label="What are you building?" required shakeKey={shakeKey} inputClassName="min-h-40" />

      <Controller
        control={form.control}
        name="nda"
        render={({ field }) => (
          <Field orientation="horizontal" className="items-start gap-3">
            <Checkbox id={`${id}-nda`} checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-0.5 size-5" />
            <FieldLabel htmlFor={`${id}-nda`} className="font-normal">
              Please sign an NDA before I share details
            </FieldLabel>
          </Field>
        )}
      />

      <div className="flex flex-col gap-3">
        <AnimatedButton type="submit" status={status} size="lg" className="w-full sm:w-fit" successText="Opening WhatsApp…" errorText="Check the highlighted fields">
          Send my project details
        </AnimatedButton>
        <p className="text-caption text-muted-foreground">
          Opens WhatsApp with your details pre-filled (or email if WhatsApp isn&rsquo;t available). We never share your information.
        </p>
      </div>
    </form>
  );
}
