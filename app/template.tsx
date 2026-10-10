import { PageTransition } from "@/components/creative/page-transition";

/** Remounts on every navigation, which drives the route transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
