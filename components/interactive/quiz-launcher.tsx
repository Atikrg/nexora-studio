"use client";

import { useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { track } from "@/lib/analytics";
import { ServiceQuiz } from "./service-quiz";

const title = "Which service do I need?";
const description = "Three quick questions. You get a recommended package and a starting price.";

/**
 * Opens the quiz in a Dialog (desktop) or a bottom Drawer (mobile). Both are Radix/vaul:
 * focus trap, Esc to close, focus returns to the trigger.
 */
export function QuizLauncher({ children, source = "launcher", ...buttonProps }: ButtonProps & { children?: ReactNode; source?: string }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) track("cta_click", { location: source, action: "open_quiz" });
  };
  const trigger = (
    <Button variant="outline" {...buttonProps}>
      {children ?? (
        <>
          <Sparkles aria-hidden="true" /> Take the 2-min quiz
        </>
      )}
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-2xl" data-lenis-prevent>
          <DialogHeader>
            <DialogTitle className="text-h3">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ServiceQuiz source={source} onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[92svh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-h3">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-8" data-lenis-prevent>
          <ServiceQuiz source={source} onDone={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
