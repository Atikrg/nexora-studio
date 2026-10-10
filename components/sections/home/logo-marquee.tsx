import { ScrollMarquee } from "@/components/creative/scroll-marquee";
import { ClientWordmark } from "@/components/shared/client-wordmark";
import { clientLogos, techStack } from "@/data/logos";

/** 02 · Logo + tech marquee: instant credibility with low cognitive load. */
export function LogoMarquee() {
  return (
    <section
      aria-label="Clients and technologies"
      className="border-y border-border py-10 md:py-14"
    >
      <p className="container-site mb-8 text-center eyebrow">
        Trusted by founders building in India, the UK, US and UAE
      </p>
      <ScrollMarquee label="Client logos">
        <ul className="flex items-center">
          {clientLogos.map((logo) => (
            <li key={logo.name} className="px-8 md:px-12">
              <ClientWordmark logo={logo} />
            </li>
          ))}
        </ul>
      </ScrollMarquee>
      <ScrollMarquee label="Technologies we use" direction={1} speed={40} className="mt-6">
        <ul className="flex items-center">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="flex items-center gap-6 px-3 font-mono text-caption tracking-[0.08em] text-muted-foreground uppercase"
            >
              {tech}
              <span aria-hidden="true" className="text-signal">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </ScrollMarquee>
    </section>
  );
}
