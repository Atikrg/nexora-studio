"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { testimonials } from "@/data/testimonials";

/** 11 · Testimonials: social proof right before the price conversation. Draggable, keyboard-friendly carousel. */
export function Testimonials({ number = 7 }: { number?: number }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Section aria-labelledby="testimonials-title" className="overflow-hidden">
      <Carousel setApi={setApi} opts={{ align: "start", loop: false }} data-cursor="Drag">
        <SectionHeading
          number={number}
          eyebrow="What founders say"
          id="testimonials-title"
          title={
            <>
              Founders who&rsquo;d <em>hire us again</em>.
            </>
          }
          action={
            <div className="flex items-center gap-4">
              <p className="font-mono text-caption text-muted-foreground" aria-live="polite">
                <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span> /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </p>
              <CarouselPrevious size="icon" className="static translate-y-0" />
              <CarouselNext size="icon" className="static translate-y-0" />
            </div>
          }
        />
        <CarouselContent className="-ml-4">
          {testimonials.map((t) => (
            <CarouselItem key={t.id} className="pl-4 md:basis-1/2 xl:basis-[40%]">
              <TestimonialCard testimonial={t} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
