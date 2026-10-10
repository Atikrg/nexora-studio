"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Clock, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AnimatedButton, type ButtonStatus } from "@/components/motion/animated-button";
import { calculator } from "@/data/calculator";
import { track } from "@/lib/analytics";
import { formatInr } from "@/lib/currency";
import { submitLead } from "@/lib/submit";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix: string;
  onChange: (v: number) => void;
};

/** Slider + number input pair, kept in sync. Both are labelled; the input allows exact values. */
function SliderField({
  id,
  label,
  hint,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: FieldProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Number.isFinite(v) ? v : min));
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-input`} className="font-medium">
            {label}
          </label>
          <p id={`${id}-hint`} className="text-small text-muted-foreground">
            {hint}
          </p>
        </div>
        <div className="relative w-32 shrink-0">
          {prefix && (
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
              {prefix}
            </span>
          )}
          <Input
            id={`${id}-input`}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-describedby={`${id}-hint`}
            onChange={(e) => onChange(clamp(e.target.valueAsNumber))}
            className={cn("text-right font-mono tabular-nums", prefix ? "pl-7" : "", "pr-12")}
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-caption text-muted-foreground">
            {suffix}
          </span>
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(clamp(v ?? min))}
        aria-label={label}
        aria-valuetext={`${prefix ?? ""}${value} ${suffix}`}
      />
    </div>
  );
}

/**
 * Automation Savings Calculator: manual hours/week × people × hourly cost → hours and ₹ saved
 * per month. Pure client-side math (data/calculator.ts holds the assumptions).
 */
export function SavingsCalculator() {
  const id = useId();
  const c = calculator;
  const [hours, setHours] = useState(c.hours.default);
  const [people, setPeople] = useState(c.people.default);
  const [cost, setCost] = useState(c.hourlyCost.default);
  const [status, setStatus] = useState<ButtonStatus>("idle");
  const tracked = useRef(false);

  const result = useMemo(() => {
    const manualMonthly = hours * people * c.weeksPerMonth;
    const savedHours = Math.round(manualMonthly * c.automationRate);
    const savedMoney = Math.round((savedHours * cost) / 100) * 100;
    return {
      savedHours,
      savedMoney,
      yearly: savedMoney * 12,
      workdays: Math.round(savedHours / 8),
    };
  }, [hours, people, cost, c.weeksPerMonth, c.automationRate]);

  // Record "calculator_use" once, after the visitor actually changes something
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (tracked.current) return;
    const t = window.setTimeout(() => {
      tracked.current = true;
      track("calculator_use", { hours, people, cost });
    }, 1200);
    return () => window.clearTimeout(t);
  }, [hours, people, cost]);

  async function bookSession() {
    setStatus("loading");
    const res = await submitLead({
      kind: "automation-session",
      name: "(from the savings calculator)",
      fields: {
        "Manual hours per week (per person)": hours,
        People: people,
        "Hourly cost": formatInr(cost),
        "Estimated hours saved / month": result.savedHours,
        "Estimated savings / month": formatInr(result.savedMoney),
      },
      message: "I'd like a free Automation Idea Session to see which tasks we can automate.",
    });
    setStatus(res.ok ? "success" : "error");
    window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-12">
      <div className="flex flex-col gap-10 p-6 md:p-10 lg:col-span-7">
        <div className="flex flex-col gap-3">
          <p id={`${id}-presets`} className="text-small font-medium">
            Quick start: what eats your team&rsquo;s time?
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${id}-presets`}>
            {c.presets.map((p) => (
              <Button
                key={p.label}
                type="button"
                size="xs"
                variant={hours === p.hours ? "default" : "outline"}
                aria-pressed={hours === p.hours}
                onClick={() => setHours(p.hours)}
              >
                {p.label} · {p.hours}h
              </Button>
            ))}
          </div>
        </div>
        <SliderField
          id={`${id}-hours`}
          label="Hours on manual tasks"
          hint="Per person, per week"
          value={hours}
          {...c.hours}
          suffix="hrs"
          onChange={setHours}
        />
        <SliderField
          id={`${id}-people`}
          label="People doing these tasks"
          hint="Founders, staff or freelancers"
          value={people}
          {...c.people}
          suffix="ppl"
          onChange={setPeople}
        />
        <SliderField
          id={`${id}-cost`}
          label="Cost of an hour of their time"
          hint="Salary ÷ working hours (founder time counts too)"
          value={cost}
          {...c.hourlyCost}
          prefix="₹"
          suffix="/hr"
          onChange={setCost}
        />
      </div>

      <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-ink p-6 text-bone md:p-10 lg:col-span-5">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 size-72 rounded-full bg-ignition opacity-30 blur-3xl"
        />
        <div className="relative flex flex-col gap-8" aria-live="polite" aria-atomic="true">
          <p className="eyebrow text-bone/70">Every month, you could save</p>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-small text-bone/70">
              <Clock aria-hidden="true" className="size-4" /> Hours back
            </p>
            <motion.p
              key={result.savedHours}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-display leading-none tabular-nums"
            >
              {result.savedHours.toLocaleString("en-IN")}
              <span className="ml-2 font-sans text-h4 font-normal text-bone/70">hrs</span>
            </motion.p>
            <p className="text-small text-bone/70">
              That&rsquo;s about {result.workdays} working days.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-small text-bone/70">
              <IndianRupee aria-hidden="true" className="size-4" /> Money saved
            </p>
            <motion.p
              key={result.savedMoney}
              initial={{ opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-h1 leading-none text-ignition tabular-nums"
            >
              {formatInr(result.savedMoney)}
            </motion.p>
            <p className="text-small text-bone/70">{formatInr(result.yearly)} a year</p>
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <AnimatedButton
            onClick={bookSession}
            status={status}
            size="lg"
            className="w-full"
            successText="Opening WhatsApp…"
          >
            Get a free Automation Idea Session
          </AnimatedButton>
          <p className="text-caption text-bone/60">{c.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
