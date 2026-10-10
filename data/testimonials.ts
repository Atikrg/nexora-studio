import type { Testimonial } from "@/types/content";

/**
 * Fictional testimonials, one per fictional case study.
 * Publishing invented reviews is misleading and can breach consumer-protection rules.
 * Replace each one with a real, permissioned quote, or delete it.
 * DUMMY: replace before launch
 */
export const testimonials: Testimonial[] = [
  // DUMMY: replace before launch
  {
    id: "t-pulsecare",
    isPlaceholder: true,
    name: "Dr. Ananya Mehta",
    role: "Co-founder & CEO",
    company: "PulseCare",
    location: "Indore",
    quote:
      "We walked into our seed meeting with a live app and 3,000 real patients instead of a Figma file. The founder picked up every call, and we never once had to chase an update.",
    rating: 5,
    caseStudy: "pulsecare",
  },
  // DUMMY: replace before launch
  {
    id: "t-ledgerly",
    isPlaceholder: true,
    name: "Rohan Kapoor",
    role: "Founder",
    company: "Ledgerly",
    location: "Bengaluru",
    quote:
      "They rewrote our homepage in one afternoon and trial sign-ups tripled within a month. It felt like having a senior product person on the team, not a vendor.",
    rating: 5,
    caseStudy: "ledgerly",
  },
  // DUMMY: replace before launch
  {
    id: "t-kulhad",
    isPlaceholder: true,
    name: "Priya Sharma",
    role: "Founder",
    company: "Kulhad & Co.",
    location: "Jaipur",
    quote:
      "Our store went from embarrassingly slow to faster than the big brands. Subscriptions now pay our fixed costs every month. Best money we spent this year.",
    rating: 5,
    caseStudy: "kulhad-co",
  },
  // DUMMY: replace before launch
  {
    id: "t-learnloop",
    isPlaceholder: true,
    name: "Arjun Verma",
    role: "Co-founder & CTO",
    company: "LearnLoop",
    location: "Kota",
    quote:
      "Clean code, weekly builds and honest pushback on features we didn't need. Our in-house team took over the codebase without a single rewrite.",
    rating: 5,
    caseStudy: "learnloop",
  },
  // DUMMY: replace before launch
  {
    id: "t-vastra",
    isPlaceholder: true,
    name: "Meera Iyer",
    role: "Founder",
    company: "Vastra Lane",
    location: "Pune",
    quote:
      "We had 300 followers and a launch date. Six weeks later our first collection sold out in four days. They understood our story better than we could tell it.",
    rating: 5,
    caseStudy: "vastra-lane",
  },
  // DUMMY: replace before launch
  {
    id: "t-sahaj",
    isPlaceholder: true,
    name: "Dr. Kunal Deshpande",
    role: "Director",
    company: "Sahaj Clinics",
    location: "Nashik",
    quote:
      "Our receptionists finally have time for patients in front of them. The WhatsApp assistant books appointments at midnight, in Marathi. I didn't think that was possible for a clinic our size.",
    rating: 5,
    caseStudy: "sahaj-clinics",
  },
];

export function getTestimonial(id?: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}
