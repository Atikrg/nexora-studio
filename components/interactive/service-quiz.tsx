"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatedButton } from "@/components/motion/animated-button";
import { Price } from "@/components/shared/price";
import { quizQuestions, quizRecommendations } from "@/data/quiz";
import { services } from "@/data/services";
import { primaryCta } from "@/data/site";
import { bookingUrl } from "@/lib/links";
import { setContactPrefill } from "@/lib/prefill";
import { track } from "@/lib/analytics";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

function recommend(answers: Record<string, string>) {
  const totals = new Map<string, number>();
  for (const q of quizQuestions) {
    const option = q.options.find((o) => o.id === answers[q.id]);
    for (const [rec, pts] of Object.entries(option?.scores ?? {})) {
      totals.set(rec, (totals.get(rec) ?? 0) + (pts ?? 0));
    }
  }
  // Highest score wins; ties go to the order in data/quiz.ts
  let best = quizRecommendations[0]!;
  let bestScore = -1;
  for (const r of quizRecommendations) {
    const score = totals.get(r.id) ?? 0;
    if (score > bestScore) {
      best = r;
      bestScore = score;
    }
  }
  return best;
}

/**
 * "Which service do I need?": 3 questions → a recommended package → a pre-filled contact form.
 * RadioGroup (keyboard: arrow keys) + Progress. Focus moves to each new question heading so
 * screen-reader and keyboard users always know where they are.
 */
export function ServiceQuiz({ onDone, source = "services_page" }: { onDone?: () => void; source?: string }) {
  const id = useId();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Set when the visitor moves between steps; the next heading to mount takes focus.
  // (A ref callback, because AnimatePresence mounts the new step only after the exit animation.)
  const focusNext = useRef(false);
  const headingRef = (el: HTMLHeadingElement | null) => {
    if (el && focusNext.current) {
      focusNext.current = false;
      el.focus();
    }
  };
  const total = quizQuestions.length;
  const done = step >= total;
  const question = quizQuestions[step];
  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers]);
  const service = result ? services.find((s) => s.slug === result.service) : undefined;
  const tier = service?.pricing.find((t) => t.name === result?.tier);
  const go = (next: number) => {
    focusNext.current = true;
    setStep(next);
  };

  useEffect(() => {
    if (result) track("quiz_complete", { result: result.id, source });
  }, [result, source]);

  function choose() {
    if (!result || !service) return;
    setContactPrefill({
      service: service.slug,
      package: result.tier,
      source: "quiz",
      message: quizQuestions
        .map((q) => `${q.question} ${q.options.find((o) => o.id === answers[q.id])?.label ?? ""}`)
        .join("\n"),
    });
    track("cta_click", { location: "quiz_result", package: result.tier });
    onDone?.();
    router.push("/contact/");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-small">
          <span className="eyebrow">{done ? "Your recommendation" : `Question ${step + 1} of ${total}`}</span>
          <span className="font-mono text-caption text-muted-foreground">{Math.round((Math.min(step, total) / total) * 100)}%</span>
        </div>
        <Progress value={(Math.min(step, total) / total) * 100} aria-label="Quiz progress" className="h-1.5" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!done && question ? (
          <motion.fieldset
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: ease.outExpo }}
            className="flex flex-col gap-5"
          >
            <legend className="contents">
              <h3 ref={headingRef} tabIndex={-1} className="mb-5 text-h3 outline-none">
                {question.question}
              </h3>
            </legend>
            <RadioGroup
              value={answers[question.id] ?? ""}
              onValueChange={(v) => setAnswers((a) => ({ ...a, [question.id]: v }))}
              className="grid gap-3 sm:grid-cols-2"
            >
              {question.options.map((option) => {
                const optionId = `${id}-${question.id}-${option.id}`;
                const checked = answers[question.id] === option.id;
                return (
                  <label
                    key={option.id}
                    htmlFor={optionId}
                    className={cn(
                      "flex min-h-16 cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-[border-color,background-color] duration-(--duration-fast)",
                      checked ? "border-primary bg-primary/8" : "border-border hover:border-foreground/40",
                    )}
                  >
                    <RadioGroupItem id={optionId} value={option.id} className="mt-0.5" />
                    <span className="flex flex-col gap-0.5">
                      <span className="font-medium">{option.label}</span>
                      {option.hint && <span className="text-small text-muted-foreground">{option.hint}</span>}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
                <ArrowLeft aria-hidden="true" /> Back
              </Button>
              <Button type="button" onClick={() => go(step + 1)} disabled={!answers[question.id]}>
                {step === total - 1 ? "See my recommendation" : "Next"} <ArrowRight aria-hidden="true" />
              </Button>
            </div>
          </motion.fieldset>
        ) : result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: ease.outExpo }}
            className="flex flex-col gap-6"
            aria-live="polite"
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-primary/50 bg-primary/8 p-6">
              <Sparkles aria-hidden="true" className="size-6 text-signal" />
              <h3 ref={headingRef} tabIndex={-1} className="text-h3 outline-none">
                {result.title}
              </h3>
              <p className="text-muted-foreground">{result.body}</p>
              {tier && (
                <p className="text-small">
                  <span className="text-muted-foreground">{tier.from ? "Starting at " : ""}</span>
                  <Price money={tier.price} className="font-semibold" />
                  {tier.billing === "monthly" ? "/month" : ""} · {tier.timeline}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AnimatedButton onClick={choose} size="lg">
                Get a quote for this
              </AnimatedButton>
              <AnimatedButton href={bookingUrl} external arrow="external" size="lg" variant="outline">
                {primaryCta.shortLabel}
              </AnimatedButton>
            </div>
            <Button
              type="button"
              variant="link"
              className="w-fit"
              onClick={() => {
                setAnswers({});
                go(0);
              }}
            >
              <RotateCcw aria-hidden="true" /> Start again
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
